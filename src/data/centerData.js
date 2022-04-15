export const centerHeader = [
    {
        name: 'Id',
		selector: row => row.Id,
		sortable: true,
		omit: true,
    },
    {
        name: 'Code',
        selector: row => row.Code ,
        sortable: true,
    },
    {
        name: 'Name',
        selector: row => row.Name ,
        sortable: true,
    },
    {
        name: 'ContactPhone',
        selector: row => row.ContactPhone ,
        sortable: true,
    },
    {
        name: 'Address',
        selector: row => row.Address ,
        sortable: true,
    },
]