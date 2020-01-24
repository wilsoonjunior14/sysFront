export default class display{

    changeBreakpoint(){
        if (window.innerWidth <= 450){
          return 1;
        }
    
        if (window.innerWidth >= 450 && window.innerWidth <= 800){
          return 2;
        }
    
        if (window.innerWidth >= 800 && window.innerWidth <= 1200){
         return 3;
        }
    
        if (window.innerWidth >= 1200){
          return 5;
        }
    
        return 6;
      }
}

