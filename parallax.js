window.addEventListener("scroll", function(event){
  let scroll = this.scrollY;

  let first = 1.5;
  let second = 3;
  let third = 6;
  let fourth = 29;

  if(window.innerWidth < 480 ) {
    first = 4;
    second = 12;
    third = 40;
    fourth = 130;
  }
  
  document.querySelector(".parallax-1").style.top = scroll+"px";
  document.querySelector(".parallax-2").style.top = scroll/first+"px";
  document.querySelector(".parallax-3").style.top = scroll/second+"px";
  document.querySelector(".parallax-4").style.top = scroll/third+"px";
  document.querySelector(".parallax-5").style.top = scroll/fourth+"px";
})