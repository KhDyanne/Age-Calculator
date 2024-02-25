const userDate=document.getElementById('userDate');
const errorDate=document.getElementById('errorDate');
const userMonth=document.getElementById('userMonth');
const errorMonth=document.getElementById('errorMonth');
const userYear=document.getElementById('userYear');
const errorYear=document.getElementById('errorYear');

let currentYear=new Date().getFullYear();
let currentMonth=new Date().getMonth()+1;
let currentDate=new Date().getDate();

  //Function to set error styles
const setErrorStylesAndBlur = (inputElement, errorMessage) => {
      inputElement.style.borderColor = 'red';
      const h3Tag = inputElement.parentElement.querySelector('h3');
      if (h3Tag) {
          h3Tag.style.color = 'red';
      }
      if (errorMessage) {
          errorMessage.style.display = 'block';``
      }
      inputElement.style.borderColor = 'red';
      inputElement.style.outlineColor = 'red';
};

  // Function to reset styles and focus
const resetStylesAndFocus = (inputElement, errorMessage) => {
      inputElement.style.borderColor = '';
      const h3Tag = inputElement.parentElement.querySelector('h3');
      if (h3Tag) {
          h3Tag.style.color = '';
      }
      if (errorMessage) {
          errorMessage.style.display = 'none';
      }
      inputElement.style.borderColor = '';
      inputElement.style.outlineColor = '';
      inputElement.focus();
};

  //Day Validation
const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

const daysInMonth = (month, year) => {
    const thirtyOneDaysMonths = [1, 3, 5, 7, 8, 10, 12];
    const thirtyDaysMonths = [4, 6, 9, 11];

    if (thirtyOneDaysMonths.includes(month)) {
        return 31;
    } else if (thirtyDaysMonths.includes(month)) {
        return 30;
    } else {
        return isLeapYear(year) ? 29 : 28;
    }
};

const validateDay = (day, month, year) => {
    const maxDaysInMonth = daysInMonth(month, year);
    return day <= maxDaysInMonth;
};

    // DATE 
userDate.addEventListener('input', (e)=>{
    e.preventDefault();

    const day = parseInt(userDate.value.trim());
    const month = parseInt(userMonth.value.trim());
    const year = parseInt(userYear.value.trim());

    if(userDate.value && !userMonth.value && !userYear.value){
      if(userDate.value.trim()<1 || userDate.value.trim()>31){ 
           setErrorStylesAndBlur(userDate,errorDate);
         }
      else{
           resetStylesAndFocus(userDate,errorDate)
      }
    }    
    

    else if(userDate.value && userMonth.value && userYear.value){

      if(!validateDay(day,month,year)){
        setErrorStylesAndBlur(userDate,errorDate); 
      }
      else if(userDate.value.trim()>currentDate){
         if(userMonth.value.trim()==currentMonth && userYear.value.trim()==currentYear){
            setErrorStylesAndBlur(userDate,errorDate);
           }
         else{
           resetStylesAndFocus(userDate,errorDate);
         }
      }
      else{
        resetStylesAndFocus(userDate,errorDate);
      }
    }
    else{
      resetStylesAndFocus(userDate,errorDate);
    }
})

    //MONTH
userMonth.addEventListener('input', (e)=>{
   e.preventDefault();
      
   const day = parseInt(userDate.value.trim());
   const month = parseInt(userMonth.value.trim());
   const year = parseInt(userYear.value.trim());

   if(userDate.value && userMonth.value && !userYear.value){
    if(userMonth.value.trim()<1 || userMonth.value.trim()>12){
      setErrorStylesAndBlur(userMonth,errorMonth);
    }
    else{
      resetStylesAndFocus(userMonth,errorMonth);
    }
   }
  
   else if(userDate.value && userMonth.value && userYear.value){
    if(!validateDay(day,month,year)){
      setErrorStylesAndBlur(userDate,errorDate); 
    }
    else if (userMonth.value.trim()>currentMonth) {
      if(userYear.value.trim()==currentYear){
         setErrorStylesAndBlur(userMonth,errorMonth);
      }
      else{
         resetStylesAndFocus(userMonth,errorMonth);
         resetStylesAndFocus(userDate,errorDate);
      }         
    }
    else if(userMonth.value.trim()==currentMonth && userYear.value.trim()==currentYear){
      if(userDate.value.trim()>currentDate){
         setErrorStylesAndBlur(userDate,errorDate);
      }
      else{
         resetStylesAndFocus(userDate,errorDate);    
      }
    }
    else{
      resetStylesAndFocus(userMonth,errorMonth);
      resetStylesAndFocus(userDate,errorDate)
    }
  }
  else{
    resetStylesAndFocus(userMonth,errorMonth);
  }   
  })

    //YEAR
userYear.addEventListener('input', (e)=>{
    e.preventDefault();

    const day = parseInt(userDate.value.trim());
    const month = parseInt(userMonth.value.trim());
    const year = parseInt(userYear.value.trim());
        
   if(userYear.value.trim()>currentYear){ 
       setErrorStylesAndBlur(userYear,errorYear);           
   } 
   else if(!validateDay(day,month,year)){
      setErrorStylesAndBlur(userDate,errorDate); 
   }

   else if(userYear.value.trim()==currentYear){
        if(userMonth.value.trim()>currentMonth){
            setErrorStylesAndBlur(userMonth,errorMonth);
        }
        else if(userMonth.value.trim()==currentMonth){
           if(userDate.value.trim()>currentDate){
             setErrorStylesAndBlur(userDate,errorDate);
           }               
           else{
             resetStylesAndFocus(userDate,errorDate);                
           }              
        }
        else{
             resetStylesAndFocus(userMonth,errorMonth); 
        }
   } 
   else{
      resetStylesAndFocus(userDate,errorDate);
      resetStylesAndFocus(userMonth,errorMonth);
      resetStylesAndFocus(userYear,errorYear);
   }
})

//SVG Click
function handleClick(){

  const year=document.getElementById('year');
  const month=document.getElementById('month');
  const day=document.getElementById('day');


  if(userDate.value && userMonth.value && userYear.value){
    if(userYear){
      if(userMonth.value.trim()>currentMonth){
        year.textContent=currentYear-userYear.value.trim()-1;
      }
      else if(userMonth.value.trim()==currentMonth){
        if(userDate.value.trim()>currentDate){
          year.textContent=currentYear-userYear.value.trim()-1;
        }
        else{
          year.textContent=currentYear-userYear.value.trim();
        }
      }
      else{
        year.textContent=currentYear-userYear.value.trim();
      }
    }
     
    
    if(userMonth){
      if(userMonth.value.trim()>currentMonth){
        if(userDate.value.trim()>currentDate){
            month.textContent=11-Math.abs(currentMonth-userMonth.value.trim());
        }
        else{
            month.textContent=12-Math.abs(currentMonth-userMonth.value.trim());
        }
      }
  
      else if(userMonth.value.trim()==currentMonth){
        if(userDate.value.trim()>currentDate){
          month.textContent=11-Math.abs(currentMonth-userMonth.value.trim());
        }
        else{
          month.textContent=Math.abs(currentMonth-userMonth.value.trim());
        }
      }
  
      else{
        if(userDate.value.trim()>currentDate){
          month.textContent='0';
        }
        else{
          month.textContent=Math.abs(currentMonth-userMonth.value.trim());
        }
      }     
    }
  
  
    if(userDate){
      if(userDate.value.trim()>currentDate){
        const mm=parseInt(userMonth.value.trim());
        const yy=parseInt(userYear.value.trim());
        day.textContent=daysInMonth(mm,yy)-userDate.value.trim()+currentDate;
      }
      else{
        day.textContent=currentDate-userDate.value.trim();
      }
    } 
  }
  else{
      (!userDate.value)? setErrorStylesAndBlur(userDate,errorDate) : null;
      (!userMonth.value)? setErrorStylesAndBlur(userMonth,errorMonth): null;
      (!userYear.value)? setErrorStylesAndBlur(userYear,errorYear): null;   
  }   
}
