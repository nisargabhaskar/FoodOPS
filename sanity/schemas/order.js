export default{
    name:   'order',
    title:  "order",
    type:   "document",
    fields: [
                {
            name:       'name',
            title:      "name",
            type:       "string",
            options:    {
                maxLength:40
            }
        },
        {
            name:       'phoneno',
            title:      "phoneno",
            type:       "string",
            options:    {
                maxLength:10
            }
        },
        {
            name:       'address',
            title:      "address",
            type:       "string",
            options:    {
                maxLength:100
            }
        },
        {
            name:       'method',
            title:      "method",
            type:       "number",
            initialValue:0
        },
        {
            name:       'total',
            title:      "total",
            type:       "number"
        },
        {
            name:       'status',
            title:      "status",
            type:       "number"
        }
    ]
}