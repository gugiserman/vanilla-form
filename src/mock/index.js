export default {
  "props": {
    "id": "form-vanilla",
    "name": "form-vanilla",
    "class": "form"
  },
  "fields": [
    {
      "component": "input",
      "props": {
        "name": "txtFullname",
        "id": "txtFullname",
        "placeholder": "Name",
        "value": "",
        "type": "text",
        "class": "input",
        "required": true
      }
    },
    {
      "component": "input",
      "props": {
        "name": "txtCpf",
        "id": "txtCpf",
        "placeholder": "CPF",
        "value": "",
        "type": "text",
        "mask": "000.000.000-00",
        "pattern": "^[0-9]{11}$",
        "class": "input",
        "required": true
      }
    },
    {
      "component": "input",
      "props": {
        "name": "txtTelephone",
        "id": "txtTelefone",
        "placeholder": "Phone",
        "value": "",
        "type": "text",
        "mask": "(00) 00000-0000",
        "pattern": "^[0-9]{11}$",
        "class": "input",
        "required": true
      }
    },
    {
      "component": "address",
      "props": {
        "name": "txtAddress",
        "id": "txtAddress",
        "placeholder": "Address",
        "value": "",
        "type": "text",
        "class": "input",
        "required": true
      }
    },
    {
      "component": "input",
      "props": {
        "name": "txtComplement",
        "id": "txtComplement",
        "placeholder": "Address complement",
        "value": "",
        "type": "text",
        "class": "input",
        "required": true
      }
    },
    {
      "component": "upload",
      "props": {
        "name": "uplImage",
        "id": "uplImage",
        "type": "file",
        "class": "upload",
        "required": true
      }
    },
    {
      "component": "image",
      "props": {
        "name": "imgAvatar",
        "id": "imgAvatar",
        "class": "image"
      }
    },
    {
      "component": "button",
      "label": "Save",
      "props": {
        "name": "btnSave",
        "id": "btnSave",
        "value": "",
        "class": "button",
        "type": "submit"
      }
    }
  ]
}
