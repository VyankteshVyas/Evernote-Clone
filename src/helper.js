//debounce function is top update the database when user has stopped tying for
//at least 1-2 seconds
export default function debounce(a,b,c){
    var d,e;
    return function(){
      function h(){
        d=null;
        c||(e=a.apply(f,g));
      }
      var f=this,g=arguments;
      return (clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e)
    }
  }
  
  //react quill (the text editor library) it displays it as actual html. so we
  //are going to save html as a string to the database. so when we display the preview in 
  //sidebar we don't want to show the html tags. so removeHTMLTags function remove the 
  //html tags.
  export function removeHTMLTags (str) {
    return str.replace(/<[^>]*>?/gm, '');
  };
  