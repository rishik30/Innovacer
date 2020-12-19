import * as React from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Text } from '@innovaccer/design-system';
import ApiUtils from "../Utils/ApiUtils"

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

interface IFileUploaderProps {
    accept: string,
    handleFileUpload: (file: Blob, mimeType: string, fileTitle: string, size: number) => void,
    onSuccess?: () => void
}

type MessageType = "success" | "error" | null

const FileUploader = (props: IFileUploaderProps) => {
    const fileInput = React.useRef(null)
    const fileBlob = React.useRef<Blob | string>()
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState<boolean>(false)
    const [fileInfoText, setFileInfoText] = React.useState<string>("Drag & drop or browse")
    const [msg, setMsg] = React.useState<{text: string, type: MessageType}>({text: "", type: null})
    const [fileStatus, setFileStatus] = React.useState<boolean>(false)

    const handleFileChange = async (event: React.FormEvent<HTMLInputElement>) => {
        const file = (event.target as any).files[0]
        const extension = file && file.name.split(".")[file.name.split(".").length - 1]
        if (file && ["csv", "xls", "xlsx"].indexOf(extension) !== -1) {
            const Fr = new FileReader();
            Fr.onload = async (fileReadEvent) => {
                const fileData: ArrayBuffer = (fileReadEvent.currentTarget as any).result;
                fileBlob.current = new Blob([fileData], { type: file.type })
            }
            Fr.readAsArrayBuffer(file)
            setFileInfoText(file.name)
            setFileStatus(true)
        } else {
          resetState(`File type (${extension}) not supported`, "error")
        }
    }

    const resetState = (text?: string, type?: MessageType, infoText?: string) => {
        if (fileInput.current && (fileInput.current as any).value) {
            (fileInput.current as any).value = ""
        }
        setFileInfoText(infoText || "Drag & drop or browse")
        setMsg({text: text || "", type: type || null})
        setFileStatus(false)
    }

    const handleClose = () => {
        resetState()
        setOpen(false)
    }

    const handleUploadClick = async () => {
        setLoading(true)
        ApiUtils.formRequest("http://localhost:5000/patients", fileBlob.current as Blob).then((res) => {
            console.log({res})
            setMsg({text: "Data saved successfully!!", type: "success"})
            setTimeout(() => {
              handleClose()
              props.onSuccess && props.onSuccess()
            }, 1000)
        }).catch(err => {
          console.log({err})
          setMsg({text: "Data failed to save", type: "error"})
        }).finally(() => {
          setLoading(false)
        })
    }

    return(
        <div className="file-uploader-container">
            <Button
                appearance="success"
                icon="add_circle_outline"
                iconAlign="right"
                onClick={() => setOpen(true)}
            >
                Add Data
            </Button>
            <Modal open={open} className="file-upload-modal">
                <ModalHeader onClose={handleClose} heading="Add Patients Data" subHeading="Upload a csv/excel file to add patients details" />
                <ModalBody>
                  <div className="file-input-container">
                    <Text className="input-info">{fileInfoText}</Text>
                    <input
                        ref={fileInput}
                        type="file"
                        onChange={handleFileChange}
                        accept={props.accept}
                        name="csvfile"
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  {msg && msg.text && msg.type && <Text className={`msg-text ${msg.type}`}>{msg.text}</Text>}
                  <Button appearance="alert" onClick={handleClose}>Cancel</Button>
                  <Button appearance="success" onClick={handleUploadClick} loading={loading} disabled={!fileStatus}>Upload</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default FileUploader
