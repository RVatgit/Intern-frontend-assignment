import {useState,useEffect } from "react"
import {postbill,updatebills} from '../redux/action'
import {useDispatch} from 'react-redux'
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { useHistory } from "react-router";

const convertdate = (date)=>{
    let arr = date.split('-');
    let tmp= arr[2]
    arr[2]=arr[0]
    arr[0]=tmp
    return arr.join('-')
}

function Formcomponent({bill}){
    const history = useHistory()
    const [id,setid] =useState()
    const [description,setdesc] = useState()
    const [category,setcat] = useState()
    const [amount,setamount] = useState()
    const [date,setdate] = useState()
    const dispatch = useDispatch()
    useEffect(()=>{
        if(bill && Object.keys(bill).length){
            console.log(bill,"not empty()")
            setid(bill.id)
            setdesc(bill.description)
            setcat(bill.category)
            setamount(bill.amount)
            setdate(convertdate(bill.date))
        }
    },[bill])
    const post=(e)=>{
        e.preventDefault();
        if(bill) dispatch(updatebills({
            id,description,category,amount,date:convertdate(date)
        }))
        else dispatch(postbill({
            description,category,amount,date:convertdate(date)
        }))
        history.push('/')
    }
    return (
        <div className="container">
            <div className="row" style={{marginTop:'40px'}}>
            <Form style={{margin:'auto'}}>
                <FormGroup>
                    <Label for="Category">Category</Label>
                    <Input type="Text" name="Category" value={category} 
                    onChange={(e)=>setcat(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="Text" name="description" value={description} 
                     onChange={(e)=>setdesc(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="amount">Amount</Label>
                    <Input type="number" name="amount" value={amount} 
                     onChange={(e)=>setamount(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="date">Date</Label>
                    <Input type="date" name="date" value={date} 
                     onChange={(e)=>setdate(e.target.value)}/>
                </FormGroup>
                <Button primary type='submit' onClick={e=>post(e)}>
                    Submit
                </Button>
        </Form>
                
            </div>

        </div>
        
    )
}

export default Formcomponent;