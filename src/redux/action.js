export const url= "http://localhost:3001/bills"

export const getall = (bills) => ({
    type:"FETCH",
    payload:bills
})

export const addbill = (bills) => ( {
    type:"ADD",
    payload:bills
}) 
export const removebill = (bills) => ( {
    type:"REMOVE",
    payload:bills
}) 
export const updatebill = (bills) => ( {
    type:"UPDATE",
    payload:bills
}) 


export const getbill = () => (dispatch) => {
    console.log("getting all bills")
    return fetch(url,{
        headers:{
            'Access-Control-Allow-Origin': '*',
        }
    })
    .then( res => res.json())
    .then ( res => dispatch(getall(res)))
    .catch ( error => console.log("error in getting bill action ",error))
}

export const postbill =( newbill ) =>(dispatch)=>{
    console.log(newbill,"POSTING BILL")
    return fetch(url,{
        method: 'POST',
        body: JSON.stringify(newbill),
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        credentials: "same-origin"
    })
    .then( res => res.json())
    .then ( res => dispatch(addbill(res)))
    .catch ( error => console.log("error in posting bill action ",error))
}

export const removebills = (billid)=>(dispatch)=>{
    return fetch(url+'/'+billid,{
        method:"DELETE",
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        credentials: "same-origin"
    })
    .then( res => res.json())
    .then ( res => dispatch(removebill(billid)))
    .catch ( error => console.log("error in remove bill action ",error))
}

export const updatebills = (bill)=>(dispatch)=>{
    console.log(bill)
    return fetch(url+'/'+bill.id,{
        method:"PUT",
        body:JSON.stringify(bill),
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        credentials: "same-origin"
    })
    .then( res => res.json())
    .then ( res => dispatch(updatebill(res)))
    .catch ( error => console.log("error in updating bill action ",error))
}