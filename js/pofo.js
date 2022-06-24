(($)=>{

 class Pofo {
    init(){
      this.header();
      this.section1();
      this.section2();
      this.section3();
      this.section4();
      this.section5();
      this.section6();
      this.section7();
      this.section8();
      this.section9();
      this.section10();

      this.quick();
      this.gotop();
    }
    header(){
      let t=false;
      let t2=false;
      $('.mobile-btn').bind({
        click: function(){
          $(this).toggleClass('on');
          $('#nav').slideToggle(300);
        }
        });
        
      function navFn (){
        if($(window).width()<=1024){
          $('#nav').hide();
          if(t===false){
            t=true;
            t2=false;
            $('.sub').fadeOut(0);              
            $('.main-btn').bind({
              click:function(event){
                $(this).next().stop().slideToggle(300); 
              }
            });
            $('.main-btn').off('mouseenter');
          }
        }
        else{ 
          $('.mobile-btn').removeClass('on');
          $('#nav').stop().show();
          if(t2===false){
            t=false;
            t2=true;
              //메인메뉴
              $('.main-btn').on({
                  mouseenter: function(){
                     $('.sub').fadeOut(0); 
                     $(this).next().fadeIn(300); 
                  }
              });
             
              $('#nav').on({
                  mouseleave: function(){
                     $('.sub').fadeOut(300); 
                  }
              });
             
              //서브서브메뉴      
              $('.sub-btn').on({
                  mouseenter: function(){
                    $('.sub-sub').fadeOut(0); 
                    $(this).next().fadeIn(300); 
                  }
              });
              $('.col24').on({
                  mouseleave: function(){
                    $('.sub-sub').fadeOut(300); 
                  }
              });
            }          
            $('.main-btn').off('click');
        }
      }
      navFn();
      $(window).resize(function(){
        navFn();
      });

      //모바일 메뉴 버튼 이벤트
      

      let result = '';
      let newTop = $(window).scrollTop(); 
      let oldTop = newTop;                

      $(window).scroll(()=>{

          newTop = $(window).scrollTop();

            result = oldTop-newTop > 0 ? 'UP' : 'DOWN';

            if(result==='UP')  {  
              $('#header').removeClass('hide');
              $('#header').addClass('show');              
            }

            if(result==='DOWN'){   
              $('#header').removeClass('show'); 
              $('#header').addClass('hide');
            }

            if($(window).scrollTop()===0){
              $('#header').removeClass('show'); 
            }

          oldTop = newTop;            

      });
      




     
    }
    section1(){
        let cnt=0;
        let n = $('#section1 .slide').length-3;
        let setId = 0;
        let setId2 = 0;
        let touchStart = null;
        let touchEnd = null;
        let result = '';
        let dragStart = null;
        let dragEnd = null;
        let mouseDown = false;

        let winW = $(window).width();


                   $(window).resize(function(){  
                        winW = $(window).width();
                        return winW;                   
                   });

                  //1. 메인슬라이드함수
                  function mainSlide(){
                      // console.log( winW );
                      // console.log( -winW*cnt );
                      $('#section1 .slide-wrap').stop().animate({left:-winW*cnt}, 600,'easeInOutExpo',function(){
                        cnt>n?cnt=0:cnt;
                        cnt<0?cnt=n:cnt;
                        $('#section1 .slide-wrap').stop().animate({left:-winW*cnt},0);
                      });
                  }
                  //2-1. 다음(Next)카운트함수
                  function nextCount(){
                    cnt++;
                    mainSlide();
                  }        
                  //2-2. 이전(Preview)카운트함수
                  function prevCount(){
                    cnt--;
                    mainSlide();
                  }

                  //3. 자동타이머함수
                  function autoTimer(){
                    setId = setInterval(nextCount, 3000);
                  }
                  autoTimer();

                 //타이머 중지 함수
                 function timerfn(){
                    let tCnt=0;
                    clearInterval(setId); //자동 타이머중지
                    clearInterval(setId2); //자동 타이머중지
                    setId2 = setInterval(function(){
                       tCnt++;
                       //console.log( tCnt );
                       if(tCnt>=3){ //3초간 아무 터치없으면 자동타이머 호출 실행
                          clearInterval(setId);  
                          clearInterval(setId2); //카운트 이제그만 그리고 자동타이머실행                         
                          autoTimer(); //자동타이머 호출 실행 3초후에 실행
                        }
                    }, 1000);
                 }


                  // 터치 스와이프 : /////////////////////////////////////////////////////////
                  // 4. 좌우 방향에 따라 다음슬라이드 또는 이전슬라이드 결정
                  //   마우스 터치 시작점(마우스다운) 그리고 터치 끝점(마우스업)을 알아야 방향 결정
                    $('#section1 .slide-container').on({
                      mousedown: function(event){ //이벤트                        
                        
                        //중지되고 난 후 3초간 아무 터치가 없으면 다신 
                        //자동타이머를 호출실행
                        timerfn();


                        touchStart = event.clientX;
                        //drag
                        dragStart = event.clientX-$('#section1 .slide-wrap').offset().left-winW;  //반드시 초기값 0셋팅
                        mouseDown = true;
                      },
                      mouseup: function(event){ //이벤트
                        touchEnd = event.clientX;
                        result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
                        if(result==='NEXT'){
                          if(!$('#section1 .slide-wrap').is(':animated')){
                            nextCount(); //다음슬라이드 호출
                          }                  
                        }
                        if(result==='PREV'){
                          if(!$('#section1 .slide-wrap').is(':animated')){
                            prevCount(); //다음슬라이드 호출
                          }
                        }
                        // 드래그 앤드롭 끝났다
                        mouseDown = false;

                      },
                      mouseleave: function(event){ //이벤트
                        if(!mouseDown){return;} //마우스다운이 아니면 강제종료
                        touchEnd = event.clientX;
                        result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
                        if(result==='NEXT'){
                          if(!$('#section1 .slide-wrap').is(':animated')){
                            nextCount(); //다음슬라이드 호출
                          }                  
                        }
                        if(result==='PREV'){
                          if(!$('#section1 .slide-wrap').is(':animated')){
                            prevCount(); //다음슬라이드 호출
                          }
                        }
                        // 드래그 앤드롭 끝났다
                        mouseDown = false;

                      },
                      mousemove: function(event){
                        if(!mouseDown){return;} //마우스다운이 아니면 강제종료
                        dragEnd = event.clientX;
                        $('#section1 .slide-wrap').css({left: dragEnd-dragStart }); //드래그 앤 드롭
                      }
                  });


                  //모바일 터치이벤트(핑거:손가락)
                  //이벤트.originalEvent.changedTouches[0].clientX
                  $('#section1 .slide-container').on({
                    touchstart: function(event){ //이벤트  touchstart                     
                      
                      //중지되고 난 후 3초간 아무 터치가 없으면 다신 
                      //자동타이머를 호출실행
                      timerfn();

                      // console.log('핑거 터치이벤트 : ', event );

                      touchStart = event.originalEvent.changedTouches[0].clientX;
                      //drag
                      dragStart = event.originalEvent.changedTouches[0].clientX;-$('.slide-wrap').offset().left-winW;  //반드시 초기값 0셋팅
                      mouseDown = true;
                    },
                    touchend: function(event){ //이벤트 touchend
                      touchEnd = event.originalEvent.changedTouches[0].clientX;;
                      result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
                      if(result==='NEXT'){
                        if(!$('#section1 .slide-wrap').is(':animated')){
                          nextCount(); //다음슬라이드 호출
                        }                  
                      }
                      if(result==='PREV'){
                        if(!$('#section1 .slide-wrap').is(':animated')){
                          prevCount(); //다음슬라이드 호출
                        }
                      }
                      // 드래그 앤드롭 끝났다
                      mouseDown = false;

                    },
                    touchmove: function(event){
                      if(!mouseDown){return;} //마우스다운이 아니면 강제종료
                      dragEnd = event.originalEvent.changedTouches[0].clientX;;
                      $('#section1 .slide-wrap').css({left: dragEnd-dragStart }); //드래그 앤 드롭
                    }
                });


    }
    section2(){
      const sec2Top = $('#section2').offset().top-$(window).height();

            $(window).scroll(function(){
                if( $(window).scrollTop() > sec2Top ){
                  $('#section2').addClass('sec2Ani');
                  return; //스크롤 탑값 계속 진행하는걸 종료
                }

                if($(window).scrollTop()===0){
                  $('#section2').removeClass('sec2Ani');
                  return;
                }
            });

    }
    section3(){

      const sec3Top = $('#section3').offset().top-$(window).height();
      
            $(window).scroll(()=>{
                if($(window).scrollTop() > sec3Top){
                  $('#section3').addClass('sec3Ani');
                  return; //스크롤 탑값 계속 진행하는걸 종료
                }
                
                if($(window).scrollTop() === 0){
                  $('#section3').removeClass('sec3Ani');
                  return;
                }
            });
    } 
    section4(){      
      let idx = 0;
      
      let winW = $(window).width();
      let cols = 4; //해상도 크기별 조건문 4 3 2 1
      let imgW = winW/cols;
      let imgH = imgW*0.8125;

      let n = $('.gallery-list').length;
      let h = $('.gallery-list.hide').length;
      let rows = Math.ceil((n-h)/cols);
      
      let sec4Top = $('#section4').offset().top-$(window).height();
      let scrOn = false; //토글변수

      setTimeout(galleryMain, 100);

      //스크롤 이벤트
      
      $(window).scroll(()=>{
        if($(window).scrollTop()===0){
          $('#section4').removeClass('sec4Ani');
          //$('#section4').removeClass('no-move');
          scrOn=false;
        }

        if($(window).scrollTop()>=sec4Top){
          if(scrOn===true){
            return
          }
          else{
            $('#section4').addClass('sec4Ani');
            scrOn=true; 
          }
        }
    
      });


      //반응형 윈도우 리사이즈
      $(window).resize(function(){              
          galleryMain();
      });
      $('.gallery-btn').each(function(index){
          $(this).on({
            click: function(e){
              e.preventDefault();
              idx = index; //클릭한 인덱스 번호
              galleryMain();
              $('.gallery-btn').removeClass('on');
              $(this).addClass('on');
            }           
          });
      });

      // 갤러리 이미지 재배치 함수
      function galleryMain(){
            $('#section4').removeClass('sec4Ani')
            winW = $(window).width();
            if(winW>=1280){
                cols = 4;
            }
            else if(winW>=1024){ //1024~1279
                cols = 3;
            }
            else if(winW>=600){ //600~1023
                cols = 2;
            }
            else { //320~599
                cols = 1;
            }
            imgW = winW/cols;
            imgH = imgW*0.8125;

            $('.gallery-list').removeClass('zoomin'); //줌 효과 삭제 초기화
            $('.gallery-list').stop().animate({width:imgW,height:imgH}).removeClass('hide'); //초기화
            $('.gallery-list .img-wrap').css({width:imgW});

            if(idx===0){     //8개 보이기(show)
                switch(cols){
                  case 4: //칸
                      $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                      $('.gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                      $('.gallery-list').eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                      $('.gallery-list').eq(3).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
        
                      $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                      $('.gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                      $('.gallery-list').eq(6).show().stop().animate({left:imgW*2,top:imgH*1}, 300);
                      $('.gallery-list').eq(7).show().stop().animate({left:imgW*3,top:imgH*1}, 300);
                      break;
                  case 3:
                      $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                      $('.gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                      $('.gallery-list').eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);

                      $('.gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*1}, 300);      
                      $('.gallery-list').eq(4).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                      $('.gallery-list').eq(5).show().stop().animate({left:imgW*2,top:imgH*1}, 300);

                      $('.gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                      $('.gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*2}, 300);
                      break;
                  case 2:
                      $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                      $('.gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
        
                      $('.gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                      $('.gallery-list').eq(3).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
        
                      $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                      $('.gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*2}, 300);
        
                      $('.gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                      $('.gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*3}, 300);                    
                      break;
                  default : //else 1칸
                      $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                      $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                      $('.gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                      $('.gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                      $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*4}, 300);
                      $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*5}, 300);
                      $('.gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*6}, 300);
                      $('.gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*7}, 300);
                }
            }
            else if(idx===1){ //3개 보이기 / 5 숨기기 재배치

              $('.gallery-list').eq(0).hide().addClass('hide');
              $('.gallery-list').eq(2).hide().addClass('hide');
              $('.gallery-list').eq(3).hide().addClass('hide');
              $('.gallery-list').eq(4).hide().addClass('hide');
              $('.gallery-list').eq(6).hide().addClass('hide');

              switch(cols){
                case 4:
                    $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    $('.gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                    $('.gallery-list').eq(7).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                    break;
                case 3:
                    $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    $('.gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                    $('.gallery-list').eq(7).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                    break;
                case 2:
                    $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    $('.gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                    $('.gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    break;
                default:
                    $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    $('.gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
              }  


            }
            else if(idx===2){ //6개 보이기 3, 7 숨기기

              $('.gallery-list').eq(3).hide().addClass('hide');
              $('.gallery-list').eq(7).hide().addClass('hide');
              
              switch(cols){
                case 4:
                    $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    $('.gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                    $('.gallery-list').eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);           
                    $('.gallery-list').eq(4).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
      
                    $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    $('.gallery-list').eq(6).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                    break;
                case 3:
                    $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    $('.gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                    $('.gallery-list').eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);           

                    $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    $('.gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                    $('.gallery-list').eq(6).show().stop().animate({left:imgW*2,top:imgH*1}, 300);
                    break;
                case 2:
                    $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    $('.gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);

                    $('.gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*1}, 300);           
                    $('.gallery-list').eq(4).show().stop().animate({left:imgW*1,top:imgH*1}, 300);

                    $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                    $('.gallery-list').eq(6).show().stop().animate({left:imgW*1,top:imgH*2}, 300);
                    break;
                default:
                    $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    $('.gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*2}, 300);           
                    $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                    $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*4}, 300);
                    $('.gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*5}, 300);
              }  

            }
            else if(idx===3){ //4개

              $('.gallery-list').eq(1).hide().addClass('hide');
              $('.gallery-list').eq(3).hide().addClass('hide');
              $('.gallery-list').eq(6).hide().addClass('hide');
              $('.gallery-list').eq(7).hide().addClass('hide');
              
              switch(cols){
                case 4:
                    $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    $('.gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);            
                    $('.gallery-list').eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                    $('.gallery-list').eq(5).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
                    break;
                case 3:
                    $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    $('.gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);            
                    $('.gallery-list').eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                    $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    break;
                case 2:
                    $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    $('.gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);            
                    $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    $('.gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                    break;
                default:
                    $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    $('.gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*1}, 300);            
                    $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                    $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
              }  

            }
            else if(idx===4){ //2개

              $('.gallery-list').eq(0).hide().addClass('hide');
              $('.gallery-list').eq(1).hide().addClass('hide');
              $('.gallery-list').eq(2).hide().addClass('hide');
              $('.gallery-list').eq(3).hide().addClass('hide');
              $('.gallery-list').eq(5).hide().addClass('hide');
              $('.gallery-list').eq(6).hide().addClass('hide');

              
              switch(cols){
                case 4:
                    $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    $('.gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                    break;
                case 3:
                    $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    $('.gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                    break;
                case 2:
                    $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    $('.gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                    break;
                default:
                    $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    $('.gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
              }  

            }
            else if(idx===5){ //5개

              $('.gallery-list').eq(0).hide().addClass('hide');
              $('.gallery-list').eq(2).hide().addClass('hide');
              $('.gallery-list').eq(6).hide().addClass('hide');
              
              switch(cols){
                case 4:
                    $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    $('.gallery-list').eq(3).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                    $('.gallery-list').eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                    $('.gallery-list').eq(5).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
      
                    $('.gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    break;
                case 3:
                    $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    $('.gallery-list').eq(3).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                    $('.gallery-list').eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);

                    $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    $('.gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                    break;
                case 2:
                    $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    $('.gallery-list').eq(3).show().stop().animate({left:imgW*1,top:imgH*0}, 300);

                    $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    $('.gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);

                    $('.gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                    break;
                default:
                    $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    $('.gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                    $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                    $('.gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*4}, 300);
              }  

            }

            // hide 클래가 몇개니?
            h = $('.gallery-list.hide').length;
            rows = Math.ceil((n-h)/cols);     //줄수는 hide  갯수를 가져온뒤에 높이를 정한다. 
            $('.galley-wrap').stop().animate({height: imgH*rows }, 300); //갤러리 전체 박스높이

            //줌 효과
            $('.gallery-list').addClass('zoomin');

      }  //갤러리 함수

    }
    section5(){
      ////변수모음////
      //HTML에서 가지고 온 내용들//
      const svg = $('.ring-front circle'); // 선택자 변수
      const perVal = [.9, .75, .9, .62]; //퍼센트 변수
    
      let sec5Top = $('#section5').offset().top-$(window).height();
      let t = false;

      let svgLength = [];
      let perLength = [];
      let piece = []; //perlength를 cut으로 나눈 값
      let cut = 200;

      let sum = [0,0,0,0];
      let setId=[0,0,0,0];


      
      function section5Ani(){
        sum = [0,0,0,0]

        svg.each(function(idx, item){
        svgLength[idx] = this.getTotalLength(); //svgArr의 각 번호마다 total Length가 들어감
        item.style.strokeDasharray = svgLength[idx];
        item.style.strokeDashoffset = svgLength[idx]; //안보이게 해둠
        perLength[idx] = svgLength[idx]*perVal[idx];
        piece[idx] = perLength[idx]/cut;
        setId[idx] = setInterval(ringAni, 10);

        function ringAni(){
          sum[idx] += piece[idx]; // sum에 piece값을 더해라
          if(sum[idx]>perLength[idx]){//도합이 perLength보다 크다면
            clearInterval(setId[idx]);
            return;
          }
          else{
            $(item).css({strokeDashoffset:svgLength[idx]-sum[idx]});
            $('.count-num').eq(idx).html(Math.ceil(sum[idx]/svgLength[idx]*100)+'%');
          }
        };
        });
        return;
      }

      $(window).scroll(function(){
        if($(window).scrollTop() > sec5Top){
          if(t===false){
            section5Ani();
            $('#section5').addClass('sec5Ani');
            t=true;
            return;
          }
        }
        if($(window).scrollTop()===0){
          $('#section5').removeClass('sec5Ani');
          t=false;
        }
      });

    }
    section6(){
      let sec6Top = $('#section6').offset().top-$(window).height();
      let t = false;

      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          $('#section6').removeClass('sec6Ani');
          t = false;
        }
        if(t===false){
          if($(window).scrollTop()>sec6Top){
            $('#section6').addClass('sec6Ani');
            t = true;
            return;
          }
        }
      });

    }
    section7(){
      const section = $('#section7')
      let sec7Top = section.offset().top-$(window).height();
      let t = false;

      $(window).scroll(function(){
        if($(window).scrollTop()>sec7Top){
          if(t===false){
            section.addClass('sec7Ani');
            t=true;
            return;
          }
        }
        if($(window).scrollTop()===0){
          section.removeClass('sec7Ani');
          t=false;
        }
      });

    }
    section8(){
      const section = $('#section8');
      let sec8Top = section.offset().top-$(window).height();
      let t = false;

      $(window).scroll(()=>{
        if($(window).scrollTop()>sec8Top){
          if(t===false){
            section.addClass('sec8Ani');
            t=true;
            return;
          } 
        }
        if($(window).scrollTop===0){
          section.removeClass('sec8Ani');
          t=false;
        }
      });
    }
    section9(){
      const section = $('#section9');
      let sec9Top = section.offset().top-$(window).height();
      let t = false;

      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          section.removeClass('sec9Ani');
          t=false;
        }
        if(t===false){
          if($(window).scrollTop()>sec9Top){
            section.addClass('sec9Ani');
            t=true;
            return;
          }
        }
      });

    }
    section10(){
      const section = $('#section10');
      let sec10Top = section.offset().top-$(window).height();
      let t = false;

      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          section.removeClass('sec10Ani');
          t=false;
        }
        if(t===false){
          if($(window).scrollTop()>sec10Top){
            section.addClass('sec10Ani');
            t=true;
            return;
          }
        }
      });
    }


    quick(){

      //퀵메뉴 : 스크롤시 따라다니는 메뉴
      let quickTop = ($(window).height()-$('#quickBox').height())/2-300;
          // console.log( quickTop );
  
      $(window).scroll(function(){
          $('#quickBox').stop().animate({top: quickTop+$(window).scrollTop() }, 300, 'easeOutExpo');
      });
    
    }
    gotop(){
  
      $(window).scroll(function(){
          if($(window).scrollTop()>100){
             $('#goTopBox').stop().fadeIn(1000); 
          }
          else{
            $('#goTopBox').stop().fadeOut(1000);
          }
      });
  
      //맨위로 부드럽게 이동 : 스무스 스크롤링 $('html, body').stop().animate({scrollTop: ), 1000)
      $('.gotop-btn').on({
        click: function(){
            $('html, body').stop().animate({scrollTop: 0 }, 600);
        }
      });
  
    }

 }
 const newPofo = new Pofo();
 newPofo.init();


})(jQuery);