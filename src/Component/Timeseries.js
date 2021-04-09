import {Bar} from 'react-chartjs-2'
import {Form,FormGroup,Input,Col,Button,Label} from 'reactstrap'
import {useState,useEffect} from 'react'




function Timeseries({data}){
    const [year,setyear] = useState(new Date().getFullYear())
    const [month,setmonth] = useState(new Date().getMonth())
    const [getx,setgetx] = useState()
    const [gety,setgety]= useState()
    const [total,settotal] = useState(0)
    const [value,setvalue]= useState([])
    const generate = (m,y)=>{
        var days=new Date(year, month, 0).getDate();
        var xx=[],yy=[],tot=0,tmpobj=[];
        for(var i=1;i<=days;++i) {
            xx.push(i);
            yy.push(0);
            tmpobj.push({})
        }
        data.forEach(d=>{
            var date=d.date.split('-');
            var tmp=date.map(d=>parseInt(d));
            if(tmp[2]===y && tmp[1]===m){
                yy[tmp[0]-1]=parseInt(d.amount)  
                tot+=parseInt(d.amount)
                var obj={...d}
                obj['index']=tmp[0]-1
                Object.assign(tmpobj[tmp[0]-1], obj)
            }
        })
        settotal(tot)
        setgetx(xx)
        setgety(yy)
        setvalue(tmpobj)
    }
    

    useEffect(()=>{
        generate(month,year)
    },[data,month,year])

 return (<div className="container">
    <Form>
            <FormGroup row>
                    <Label sm={2} for="monthly">Get Monthly Chart:</Label>
                    <Col sm={4}>
                    <Input value={year+'-'+(month.toString().length==1?'0':'')+month} type="month" name="monthly" onChange={e=>{
                        const arr=e.target.value.split('-')
                        setyear(parseInt(arr[0]))
                        setmonth(parseInt(arr[1]))
                    }} />
                    </Col>

                    <Col className='text-center' style={{padding:'auto',backgroundColor:'orange',fontWeight:'bolder',fontSize:'1.5rem'}}>
                    Monthly Total : $ {total}
                    </Col>
            </FormGroup>
    </Form>
    <div>
        <Bar
        data ={{labels: getx,
                datasets: [{
                    label:"Bill",
                    data:gety
                }],       
            }}
    
        width={600}
        height={400}
        options={{ maintainAspectRatio: false,
                tooltips:{
                    callbacks: {
                        title: function(tooltipItem, data) {
                          var name=data.labels
                          value.forEach(d=>{
                            name[d.index]=d.description
                          })
                          return name[tooltipItem[0]['index']];
                        },
                        label: function(tooltipItem, data) {
                          return data['datasets'][0]['data'][tooltipItem['index']];
                        }
                    }
                }
            }}
        />
    </div>
    
    </div>
    )
}

export default Timeseries