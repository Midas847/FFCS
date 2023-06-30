import React, { useContext, useRef } from 'react'
import { DataContext } from '../Context/ContextApi';
import Header from './Header';
import PickedCourses from './PickedCourses';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';




const TimeTable = () => {
  const tableRef = useRef(null);

  const generatePDF = () => {
    const input = tableRef.current;
  
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save('timetable.pdf');
    });
  };

  const {registeredCourses} = useContext(DataContext);
  const cellData = [
    "8:00 AM$8:50 AM","9:00 AM$9:50 AM","10:00 AM$10:50 AM","11:00 AM$11:50 AM","12:00 PM$12:50 PM","","L","2:00 PM$2:50 PM","3:00 PM$3:50 PM",
      "4:00 PM$4:50 PM","5:00 PM$5:50 PM","6:00 PM$6:50 PM","6:51 PM$7:00 PM","7:01PM$7:50 PM",
      "8:00 AM$8:50 AM","8:51 AM$9:40 AM","9:51 AM$10:40 AM","10:41 AM$11:30 AM","11:40 PM$12:30 PM","12:31 PM$1:20 PM","U","2:00 PM$2:50 PM"
      ,"2:51 PM$3:40 PM","3:51 PM$4:40 PM","4:41 PM$5:30 PM","5:40 PM$6:30 PM","6:31 PM$7:20 PM",""
  ]
  const bodyData = [
    "A1 / L1","F1 / L2","D1 / L3","TB1 / L4","TG1 / L5","L6","N","A2 / L31","F2 / L32","D2 / L33","TB2 / L34","TG2 / L35","L36","V3",
    "B1 / L7","G1 / L8","E1 / L9", "TC1 / L10","TAA1 / L11","L12","C","B2 / L37","G2 / L38","E2 / L39", "TC2 / L40","TAA2 / L41","L42","V4",
    "C1 / L13","A1 / L14","F1 / L15","V1 / L16","V2 / L17","L18","H","C2 / L43", "A2 / L44","F2 / L45","TD2 / L46","TBB2 / L47","L48","V5",
    "D1 / L19","B1 / L20","G1 / L21","TE1 / L22","TCC1 / L23","L24","","D2 / L49", "B2 / L50","G2 / L51","TE2 / L52","TCC2 / L53","L54","V6",
    "E1 / L25","C1 / L26","TA1 / L27","TF1 / L28","TD1 / L29","L30","","E2 / L55", "C2 / L56","TA2 / L57","TF2 / L58","TDD2 / L59","L60","V7"];
  const days = ["Mon", "Tue", "Wed", "Thu","Fri"];
  const slots = [];
  registeredCourses.map((course)=>{
    for(const slot of course.slot_ids){
      slots.push(slot);
    }
  });
  console.log(slots);
  return (
    <><Header />
    <div className='p-20'>
        <div ref={tableRef}>
        <table  className="w-full border-spacing-2 border border-slate-400">
          <thead className=''>
            <tr>
              <th className='border border-slate-400 bg-[#c0c0c0]'>
                <h1>THEORY<br/>HOURS </h1>
              </th>
              {
                cellData.slice(0,14).map((cell,index)=>
                    // cell===""?(<th className='border border-slate-400 py-3 bg-[#CCCCFF]'></th>):(<th className='border border-slate-400 py-3 bg-[#CCCCFF]'><h1>{cell.split("$")[0] }<br/>to<br/>{cell.split("$")[1]}</h1></th>)
                  
                  {  
                    if(cell==="")
                      {
                        return <th className='border border-slate-400 py-3 bg-[#CCCCFF]'></th>
                      }
                     else if(cell==="L"){
                      return <th className='py-3 bg-[#c0c0c0]'>L</th>
                     }
                     else{
                      return <th className='border border-slate-400 py-3 bg-[#CCCCFF]'><h1>{cell.split("$")[0] }<br/>to<br/>{cell.split("$")[1]}</h1></th>
                     }
                  }
                )
              }
            </tr> 
          </thead>
          <thead className=''>
            <tr>
              <th className='border border-slate-400 bg-[#c0c0c0]'>
                <h1>LAB<br/>HOURS </h1>
              </th>
              {
                cellData.slice(14,28).map((cell,index)=>
                    // cell===""?(<th className='border border-slate-400 py-3 bg-[#99ccff]'></th>):(<th className='border border-slate-400 py-3 bg-[#99ccff]'><h1>{cell.split("$")[0] }<br/>to<br/>{cell.split("$")[1]}</h1></th>)
                    {  
                      if(cell==="")
                        {
                          return <th className='border border-slate-400 py-3 bg-[#CCCCFF]'></th>
                        }
                       else if(cell==="U"){
                        return <th className='pt-5 bg-[#c0c0c0]'>U</th>
                       }
                       else{
                        return <th className='border border-slate-400 py-3 bg-[#CCCCFF]'><h1>{cell.split("$")[0] }<br/>to<br/>{cell.split("$")[1]}</h1></th>
                       }
                    }
                )
              }
              
            </tr> 
          </thead>

          <tbody>
            {
              days.map((day,index)=>(
                <tr>
                <th className='border border-slate-400 bg-[#c0c0c0]'>
                  <h1>{day}</h1>
                </th>
                {bodyData.slice(14*index, 14*index+14).map((data, index) => 
                  
                  {
                    if(data==="N" || data==="C" || data==="H" || data===""){
                      return (
                        <th key={index} className="font-semibold py-2 bg-[#c0c0c0]">
                          <p>{data}</p>
                      </th>
                      )
                    }
                    else
                    {
                     
                      if(slots.includes(data.split(' / ')[0]) || slots.includes(data.split(' / ')[1])){
                        return (<th key={index} className="border border-slate-400 opacity-70 font-semibold py-2 bg-green-400 hover:bg-green-300 cursor-pointer">
                        <p>{data}</p>
                      </th>)
                      }
                      else
                      {
                        return (<th key={index} className="border border-slate-400 opacity-70 font-semibold py-2 bg-[#ffffcc] hover:bg-green-300 cursor-pointer">
                        <p>{data}</p>
                      </th>)
                      }
                    }
                  }
              )}
            </tr> 
              ))
            }
          </tbody>
        </table>
        
        <PickedCourses/>
        </div>
        {/* <button onClick={generatePDF}></button> */}
        <button onClick={generatePDF} className="mt-10 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center ml-[45%]">
          <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
          <span>Download</span>
        </button>
    </div>
    </>
  )
}

export default TimeTable