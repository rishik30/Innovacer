import * as React from "react"
import {useHistory} from "react-router-dom"
import {Card, Table} from "@innovaccer/design-system"
import ApiUtils from "../Utils/ApiUtils"

const loaderSchema = [
    {
        "name": "name",
        "displayName": "Name",
        "width": "25%",
        "resizable": true,
        "tooltip": true,
        "separator": true,
        "cellType": "AVATAR_WITH_TEXT"
    },
    {
        "name": "email",
        "displayName": "Email",
        "width": "20%",
        "resizable": true,
        "sorting": false,
        "cellType": "WITH_META_LIST"
    },
    {
        "name": "gender",
        "displayName": "Gender",
        "width": "15%",
        "resizable": true,
        "filters": [
            {
                "label": "Male",
                "value": "male"
            },
            {
                "label": "Female",
                "value": "female"
            }
        ]
    },
    {
        "name": "contact",
        "displayName": "Contact",
        "width": "25%",
        "resizable": true,
        "align": "center"
    },
    {
        "name": "age",
        "displayName": "Age",
        "width": "15%",
        "resizable": true,
        "align": "center"
    }
];

const schema = [
    {
      name: 'name',
      displayName: 'Name',
      width: "25%",
      resizable: true,
      separator: true,
      translate: (a: any) => ({
        title: a.name,
        firstName: a.name.split(" ")[0],
        lastName: a.name.split(" ")[1]
      }),
      cellType: 'AVATAR_WITH_TEXT',
    },
    {
      name: 'email',
      displayName: 'Email',
      width: "20%",
      resizable: true,
      sorting: false
    },
    {
      name: 'gender',
      displayName: 'Gender',
      width: "15%",
      resizable: true,
      sorting: false,
      filters: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
      ],
      onFilterChange: (a: any, filters: any) => {
        for (const filter of filters) {
          if (a.gender.toLowerCase() === filter) return true;
        }
        return false;
      }
    },
    {
      name: 'contact',
      displayName: 'Contact',
      width: "25%",
      resizable: true,
      sorting: false
    },
    {
      name: 'age',
      displayName: 'Age',
      width: "15%",
      resizable: true,
      translate: (a: any) => ({
        title: a.age
      }),
      comparator: (a: any, b: any) => {
        return a.age - b.age
      }
    }
  ];

interface IPatientsTableProps {
  fetchCount: number
}

const PatientsTable = (props: IPatientsTableProps) => {
  let history = useHistory()
  const [data, setData] = React.useState<any[]>([])

  const translateData = (schema: any, data: any) => {
    let newData = data;

    if (schema.translate) {
      const translatedData = schema.translate(data);
      newData = {
        ...newData,
        [schema.name]: typeof translatedData === "object" ? {
          ...newData[schema.name],
          ...translatedData
        } : translatedData
      };
    }
    if (typeof newData[schema.name] !== "object") newData[schema.name] = { title: newData[schema.name] };
    return newData;
  }

  const filterData = (schema: any, data: any, filterList: any) => {
    let filteredData = data;
    if (filterList) {
      Object.keys(filterList).forEach(schemaName => {
        const filters = filterList[schemaName];
        const sIndex = schema.findIndex((s: any) => s.name === schemaName);
        const { onFilterChange } = schema[sIndex];
        if (filters.length && onFilterChange) {
          filteredData = filteredData.filter((d: any) => onFilterChange(d, filters));
        }
      });
    }

    return filteredData;
  };

  const sortData = (schema: any, data: any, sortingList: any) => {
    const sortedData = [...data];
    sortingList.forEach((l: any) => {
      const sIndex = schema.findIndex((s: any) => s.name === l.name);
      if (sIndex !== -1) {
        const defaultComparator = (a: any, b: any) => {
          const aData = translateData(schema[sIndex], a);
          const bData = translateData(schema[sIndex], b);
          return aData[l.name].title.localeCompare(bData[l.name].title);
        };

        const {
          comparator = defaultComparator
        } = schema[sIndex];

        sortedData.sort(comparator);
        if (l.type === "desc") sortedData.reverse();
      }
    });

    return sortedData;
  }

  const fetchData = async (options: any): Promise<{count: number, data: any, schema: any}> => {
    const {page, pageSize, sortingList, filterList, searchTerm} = options;

    const onSearch = (d: any, searchTerm = "") => {
      return d.name.toLowerCase().match(searchTerm.toLowerCase())
    }

    let currentData = await ApiUtils.getRequest("http://localhost:5000/patients")
    setData(currentData)

    const filteredData = filterData(schema, currentData, filterList);
    const searchedData = filteredData.filter((d: any) => onSearch(d, searchTerm));
    const sortedData = sortData(schema, searchedData, sortingList);

    if (page && pageSize) {
      return new Promise(resolve => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const slicedData = sortedData.slice(start, end);
        resolve({
          schema,
          count: sortedData.length,
          data: slicedData,
        });
      });
    }

    return new Promise(resolve => {
      resolve({
        schema,
        count: sortedData.length,
        data: sortedData,
      });
    });
  }

  const handleRowClick = (rowData: any, index?: number) => {
    history.push(`/patient/${rowData._id}`)
  }

  const hasData = data && data.length > 0
  return (
    <Card>
      {<Table
        type="resource"
        key={props.fetchCount}
        onRowClick={handleRowClick}
        loaderSchema={schema as any}
        fetchData={fetchData}
        withHeader={true}
        headerOptions={{
            withSearch: true
        }}
        withPagination={true}
        pageSize={7}
        data={data} />}
    </Card>
  )
}

export default PatientsTable
