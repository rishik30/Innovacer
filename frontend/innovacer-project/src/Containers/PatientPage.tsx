import * as React from "react"
import {RouteComponentProps} from "react-router-dom"
import {Card, Spinner, Avatar, Text} from "@innovaccer/design-system"
import ApiUtils from "../Utils/ApiUtils";

interface IPatientContainerProps extends RouteComponentProps {}

const PatientContainer = (props: IPatientContainerProps) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [details, setDetails] = React.useState<any>(null)

    React.useEffect(() => {
        console.log((props.match.params as {id: string}).id)
        const patientId = (props.match.params as {id: string}).id
        ApiUtils.getRequest(`http://localhost:5000/patient/${patientId}`).then((res) => {
            console.log({res})
            if (res && res.data) {
              setDetails(res.data)
            }
        }).catch(err => {
          console.log({err})
        }).finally(() => {
          setTimeout(() => {
            setIsLoading(false)
          }, 1500)
        })
    }, [])

    return (
        <div className="patient-details-container">
          <div className="patient-cont">
            <div className="background" />
            {isLoading && <div className="loader">
              <Spinner appearance="primary" size="large" />
            </div>}
            {!isLoading && details && <Card className="w-25" shadow="medium">
                <Avatar firstName={details.name.split(" ")[0]} lastName={details.name.split(" ")[1]} size="regular" />
                <div className="patient-details">
                  <Text className="bold name">{details.name}</Text>
                  <Text>{details.contact}</Text>
                  <Text>{details.email}</Text>
                  <Text>{details.gender}</Text>
                  <Text>{details.age}</Text>
                </div>
            </Card>}
          </div>
        </div>
    )
}

export default PatientContainer
