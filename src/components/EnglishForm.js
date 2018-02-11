export default {
  items: [
    {
      name: "Name",
      type: "text",
      options: {
        label: "Please Enter your name"
      }
    },
    {
      name: "Gender",
      type: 'select',
      children: [{
        name: "Male"
      }, {
        name: "Female"
      }, {
        name: "Rather Not Specify"
      }, {
        name: "Others"
      }]
    },
    {
      name: "Date of Birth",
      type: 'date',
    },
    {
      name: "Place of Registration",
      type: "text",
      options: {
        label: "Place of Registration"
      }
    },
    {
      name: "Occupation",
      type: "text",
      options: {
        label: "Occupation"
      }
    }
  ]
}