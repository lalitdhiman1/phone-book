import React, { useState, useEffect } from 'react';

function PhoneBookForm(props) {
const [fname, setFname] = useState("");
const [lname, setLname] = useState("");
const [pnumber, setPnumber] = useState("");

const submitForm = (e) => {
    e.preventDefault();

    let first_name = fname;
    let last_name = lname;
    let phone_number = pnumber;

    if (!first_name || !last_name || !phone_number) {
        return;
    }
    props.onContactSubmit({ fname: first_name, lname: last_name, pnumber: phone_number });

    document.getElementById("firstName").value = ""
    document.getElementById("lastName").value = ""
    document.getElementById("phoneNumber").value = ""
    setFname("");
    setLname("");
    setPnumber("")
}
return (
    <form data-testid="formContact" className="formContact" style={{ width: "90%", padding: "10px" }} onSubmit={(e) => submitForm(e)}>
        <input data-testid="firstName" aria-label="firstName" style={{ width: "100%", padding: "5px", margin: "5px", height: "30px" }} id="firstName" type="text" onChange={(e) => setFname(e.target.value)} placeholder="First Name" />
        <input data-testid="lastName" aria-label="lastName" id="lastName" style={{ width: "100%", margin: "5px", height: "30px", padding: "5px", }} type="text" onChange={(e) => setLname(e.target.value)} placeholder="Last Name" />
        <input type="number" maxLength="10" style={{ width: "100%", margin: "5px", height: "30px", padding: "5px", }} aria-label="phoneNumber" data-testid="phoneNumber" id="phoneNumber" onChange={(e) => setPnumber(e.target.value)} placeholder="Number" />
        <button style={{ width: "150px", background: "orange", margin: "5px", border: "1px solid #000", color: "#fff", height: "30px" }} data-testid="addContactButton" className="addContactButton" id="addContactButton" type="submit">Add Contact</button>
    </form>
);
}

function InformationTable(props) {

const [data, setData] = useState([]);

useEffect(() => {
    setData(props.data)
}, [])


return (
    (props.data.length > 0) ? <table border="0" cellPadding="10" style={{ margin: "20px", textAlign: "left" }} cellSpacing="0" width="95%">
    <thead><tr style={{ background: "#ccc" }}><th>First Name</th><th>Last Name</th><th>Phone Number</th></tr></thead><tbody>
        {
            data.map((contact, i) => (
                (i % 2 === 0) ? <tr style={{ background: "#f1f1f1" }} key={contact.pnumber}><td>{contact.fname}</td><td>{contact.lname}</td><td>{contact.pnumber}</td></tr> : <tr key={contact.pnumber}><td>{contact.fname}</td><td>{contact.lname}</td><td>{contact.pnumber}</td></tr>
            ))
        }
    </tbody></table> : ""
);
}

function Application(props) {
const [data, setData] = useState([]);
const loadDataFromVar = () => {
    setData(data);
}


const compare = (_arguments) => {
    return (a, b) => {
        if (a[_arguments].toLowerCase() < b[_arguments].toLowerCase()) {
            return -1;
        }
        if (a[_arguments].toLowerCase() > b[_arguments].toLowerCase()) {
            return 1;
        }
        return 0;
    }
}
const handleContactSubmit = (contact) => {

console.log(contact)

    props.data.push(contact);
    props.data.sort(compare('lname'))
    setData(props.data)
    console.log(props.data)
}


useEffect(() => {
    loadDataFromVar();
    setInterval(loadDataFromVar, props.pollInterval);
}, [])

return (
    <section>
        <PhoneBookForm onContactSubmit={handleContactSubmit} />
        <InformationTable data={props.data} />
    </section>
)
}

export default Application;
