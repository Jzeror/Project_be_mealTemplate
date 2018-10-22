var bemeal = bemeal || {};
bemeal = (()=>{
	var init =x=>{
		/*$(window).resize(()=>{ 브라우저의 사이즈 변화감지
			console.log("window 폭:"+$(window).width());
		});*/
		bemeal.router.init(x);
	};
	var onCreate =()=>{
		setContentView();
	};
	var setContentView =()=>{
		
	};
	return {init:init};
})();
bemeal.main = (()=>{
	var init =()=>{
		onCreate();
	};
	var onCreate=()=>{
		setContentView();
	};
	var setContentView=()=>{
		bemeal.router.main();
		
	};
	return {init:init};
})();
bemeal.router = {
		init : x=>{
			$.when(
				$.getScript(x+"/resources/js/router.js",()=>{
					$.extend(new Session(x));
				}),
				$.getScript(x+"/resources/js/util.js"),
				$.getScript(x+"/resources/js/comp.js"),
				$.Deferred(y=>{
					$(y.resolve);
				})
			).done(z=>{
				bemeal.main.init();
			});
		},
		main : ()=>{
			/*메인화면 그리기*/
			$.getScript($.script()+"/ui/navi.js",()=>{
				$('#wrapper').html(naviUI())
				.append(
					$('<header/>').append(
							bemeal.compo.banner({
								id:'banner',
								arr:[{image:"/web/resources/img/cmm/banner/banner1.jpg"},{image:"/web/resources/img/cmm/banner/banner2.jpg"}]
							})
					),					
					$('<div/>').attr({id:'content'})
					/*,
					$('<footer/>')*/
				);
				/*footer 삭제
				$.getScript($.script()+"/ui/footer.js",()=>{
					$('footer').append(footerUI());
				});*/
				let $content = $('#content');
				let $carousels = $('<div/>').appendTo($content);

				$.getJSON($.ctx()+"/item/list/grade",d=>{
					console.log(d.list);
					$carousels.append(
							bemeal.compo.carousel({
								id:'carousel1',
								title:'가장 평점이 높은',
								arr:d.list,
								row_size:5
							})
					);
				}); /*getJSON end*/
				
				$.getJSON($.ctx()+"/item/list/buy",d=>{
					$carousels.append(
							bemeal.compo.carousel({
								id:'carousel2',
								title:'가장 판매량이 높은',
								arr:d.list,
								row_size:5
							})
					);
				}); /*getJSON end*/
				
				$.getJSON($.ctx()+"/item/list/wish",d=>{
					$carousels.append(
							bemeal.compo.carousel({
								id:'carousel3',
								title:'가장 인기 있는',
								arr:d.list,
								row_size:5
							})
					);
				}); /*getJSON end*/
				// 무한 스크롤 테스트
				let num = 4;
				/*
				 * 무한 스크롤로 추가되는 카테고리들을 어떻게 정할지 고민 필요
				 * case 1 : DB에서 카테고리들을 가져와서 js에서 배열로 저장해둔 후 배열에서 랜덤으로 카테고리를 뽑아내서 결정
				 * 			js에서 java로 데이터를 요청할때 카테고리이름만 전송하면 됨.
				 * 			java에서 카테고리를 가져올때 전부가 아니라 화면에 보여주고 싶은 갯수 만큼만 가져올것
				 * case 2 : js에서 java로 데이터롤 요청하면 java에서 DB에서 이미 화면에 뿌려지지 않은 카테고리를 검색하여 js로 전송
				 * 			이 경우 js에서 이미 검색된 배열정보를 java로 보내주어야함.  
				 */
				let titles = [];
				let $window = $(window);
				$window.scroll(e=>{
					if(num<=10 && $window.scrollTop()+$window.height()+30>$(document).height()){
						$.getJSON($.ctx()+"/item/list/scrollTest",d=>{
							$carousels.append(
									bemeal.compo.carousel({
										id:'carousel'+num,
										title:'scrollTest'+(num-3),
										arr:d.list,
										row_size:5
									})
							);
							num++;
						}); 
					}
				});//scroll event end
				
				
				$('#logo').click(e=>{
					e.preventDefault();
					bemeal.router.main();
				});

				$('#taste').click(e=>{
					e.preventDefault();
					alert('taste click');
					$('.nav-item').removeClass('active');
					$('#taste').parent().addClass('active');
					$.getScript($.script()+"/kaeun.js",()=>{
						/*가야 할 곳은 개인이 알아서*/
						$window.off('scroll');
						kaeun.main.init();
					})
				});
				$('#menu').click(e=>{
					e.preventDefault();
					alert('1.menu click');
					$('.nav-item').removeClass('active');
					$('#menu').parent().addClass('active');
					$.getScript($.script()+"/yoonho.js",()=>{
						/*가야 할 곳은 개인이 알아서*/
						$window.off('scroll');
						yoonho.service.list();

					})
				});
				$('#login').click(e=>{
					e.preventDefault();
					alert('login click');
					$.getScript($.script()+"/junghoon.js",(e)=>{
						/*가야 할 곳은 개인이 알아서*/
						$window.off('scroll');
						junghoon.member.login();
					})
				});
				$('#join').click(e=>{
					e.preventDefault();
					alert('join click');
					$('.nav-item').removeClass('active');
					$('#join').parent().addClass('active');
					$.getScript($.script()+"/junghoon.js",()=>{
						/*가야 할 곳은 개인이 알아서*/
						$window.off('scroll');
						junghoon.member.add();
					})
				});
				
				$('#testSearch').click(e=>{
					e.preventDefault();
					
					$.getScript($.script()+"/junghoon.js",()=>{
						/*가야 할 곳은 개인이 알아서*/
						alert('testSearch click');
						junghoon.service.search();
					})
				});
				$('#evaluate').click(e=>{
					e.preventDefault();
					alert('evaluate 클릭');
					$('.nav-item').removeClass('active');
					$('#evaluate').parent().addClass('active');
					bemeal.evaluate.main();
				});
				$('#sam').click(e=>{
					e.preventDefault();
					alert('sam click');
					$.getScript($.script()+"/sam.js",()=>{
						$window.off('scroll');
						sam.util.popup();
					})
				});
			});
		}
};

bemeal.compo=(()=>{
	var btn = x=>{
		
	}
	var carousel = x=>{/*x.id, x.title 슬라이드의 제목, x.arr 슬라이드에 보여질 이미지들, x.row_size 한번에 보여줄 이미지의 갯수*/
		let arr = x.arr;
		let row_size = x.row_size;
		let $div = $('<div/>').attr({id:x.id,'data-ride':'carousel'}).addClass('carousel slide')
					.append($('<h5/>').addClass('carousel-title').append($('<span/>').text(x.title)));
		let $ol = $('<ol/>').addClass('carousel-indicators').appendTo($div);
		let navi_size = x.arr.length/row_size;
		for(let i=0;i<navi_size;i++){
			$('<li/>').attr({'data-target':"#"+x.id,'data-slide-to':i}).addClass((i==0)?'active':'')
			.appendTo($ol);
		}
		//
		let $inner = $('<div/>').addClass('carousel-inner').appendTo($div);
		for(let i=0;i<navi_size;i++){
			let $temp = $('<div/>').addClass('carousel-item'+((i==0)?' active':'')).appendTo($inner);
			let $span = $('<span/>').appendTo($temp);
			for(let j=i*row_size;j<(i+1)*row_size;j++){
				$('<div/>').text(arr[j].itemName).appendTo($span);
				$('<img/>').attr({
					src:arr[j].image,
					alt:arr[j].itemName
					,
					style:"width:"+(100/row_size)+"%;height:150px"
				})
				.click(e=>{
					alert('도시락 누름');
					$.getScript($.script()+"/yoonho.js",()=>{
						yoonho.service.retrieve(arr[j].itemSeq);
					});
				})
				.addClass('img_hover')
				.appendTo($span);
			}
		}
		let arrows = ['prev','next'];
		for(let i=0;i<2;i++){
			$('<a/>').addClass('carousel-control-'+arrows[i]).attr({href:'#'+x.id,'data-slide':arrows[i], roll:'button'})
			.append(
					$('<span/>').addClass('carousel-control-'+arrows[i]+'-icon').attr('aria-hidden','true'),
					$('<span/>').addClass('sr-only').text(arrows[i])
			)
			.appendTo($div);
		}
		return $div.swipe({
					  swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
						    if (direction == 'left') $(this).carousel('next');
						    if (direction == 'right') $(this).carousel('prev');
						  },
						  allowPageScroll:"vertical"
						});;
	};
	var banner = x=>{ /* x.id, x.arr 배너에 보여줄 이미지들*/
		let $div = $('<div/>').attr({id:x.id,'data-ride':'carousel'}).addClass('carousel slide')
					.append($('<h5/>').addClass('carousel-title').append($('<span/>').text(''))); /* text : 배너 제목*/
		let $ol = $('<ol/>').addClass('carousel-indicators').appendTo($div);
		let arr = x.arr;
		for(let i=0;i<arr.length;i++){
			$('<li/>').attr({'data-target':"#"+x.id,'data-slide-to':i}).addClass((i==0)?'active':'')
			.appendTo($ol);
		}
		let $inner = $('<div/>').addClass('carousel-inner').appendTo($div);
		for(let i=0;i<arr.length;i++){
			let $temp = $('<div/>').addClass('carousel-item'+((i==0)?' active':'')).appendTo($inner);
			let $span = $('<span/>').appendTo($temp);
			for(let j=i;j<(i+1);j++){
				$('<div/>').text('').appendTo($span); /*text : 배너 내용*/
				$('<img/>').attr({
					src:arr[j].image,
					style:"width:100%"
				})
				.click(e=>{
					alert('배너 누름');
				})
				.appendTo($span);
			}
		}
		let arrows = ['prev','next'];
		for(let i=0;i<2;i++){
			$('<a/>').addClass('carousel-control-'+arrows[i]).attr({href:'#'+x.id,'data-slide':arrows[i],roll:'button'})
			.append(
					$('<span/>').addClass('carousel-control-'+arrows[i]+'-icon').attr('aria-hidden','true'),
					$('<span/>').addClass('sr-only').text(arrows[i])
			)
			.appendTo($div);
		}
		return $div;
	};
	return {
		carousel:carousel,
		banner:banner
		};
})();

bemeal.evaluate=(()=>{
	var main=x=>{
		let $evaluate_progress = $('header').empty().addClass('evaluate_progress');
		let $evaluate_progress_ratings_count = $('<div/>').addClass('evaluate_progress_ratings_count').appendTo($evaluate_progress);
		let $evaluate_progress_message = $('<div/>').addClass('evaluate_progress_message').appendTo($evaluate_progress);
		let $evaluate_progress_bar= $('<div/>').addClass('evaluate_progress_bar').appendTo($evaluate_progress);
		let $evaluate_progress_value= $('<div/>').addClass('evaluate_progress_value').appendTo($evaluate_progress_bar);
		///가져온 코드
		let $content =  $('#content').empty();
		for(let i=1;i<5;i++){
			let $gift_slid = $('<div/>').attr({id:'gift_slid'+i}).addClass('card-group');
			$content.append(
					$('<div>').addClass('col').append(
							$('<div/>').addClass('card_row').append(
									$gift_slid
							)
					)
			);
			for(let j=1;j<5;j++){
				let $gift_c = $('<div/>').addClass('card gift_c');
				let $gift_img = $('<div/>').addClass('gift_img').append(
						$('<img/>').attr({src:'https://images.pexels.com/photos/884596/pexels-photo-884596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'})
				).appendTo($gift_c);
				let $gift_details = $('<div/>').addClass('gift_details').appendTo($gift_c);
				let $h2 = $('<h2/>').addClass('evaluative_title').text('아이템이름').appendTo($gift_details);
				let $star_rating_container = $('<div/>').appendTo($gift_details)
				.starRating({ //https://github.com/nashio/star-rating-svg
					initialRating: 0, //초기값  
					starSize: 32,  //width속성값
					minRating : 0.5,
					emptyColor : 'white',
					hoverColor : 'orange',
					activeColor : 'orange',
					ratedColor : 'orange',
					useGradient : false,
					strokeColor: 'orange',  //border color
					callback : (currentRating, $el)=>{
						alert(currentRating);
						let flag = false; //평점을 준적이 없으면 false 있으면 true
						/*getJSON($.ctx()+'/',()=>{//id와 item_seq를 넘겨줌
							
						})*/
						
					}
					});
				/*setTimeout(() => {
					$star_rating_container.starRating('setReadOnly',false);	
				}, 1000);*/
				
				$gift_slid.append($gift_c);
				/*$gift_slid.append($(
						'<div class="card gift_c">'
						+'            <div class="gift_img"><img src="https://images.pexels.com/photos/884596/pexels-photo-884596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"></div>'
						+'            <div class="gift_details">'
						+'                <h2 style="text-align:center; color:black;">아이템이름 <br><span>☆☆☆☆☆</span></h2>'
						+'                <div class="gift_msg">'
						+'                    <p>메세지 Lorem Ipsum has been the industrys standard, when an unknown printer took a galley '
						+'                        remaining essentially unchanged...</p>'
						+'                </div>' //평가페이지에선 지울까? 제품 설명을 넣을까?
						+'            </div>'
						+'        </div>'		
				));*/
			}
			
		}
		
		
		
		
		
		//content_list는 가져다 쓰자, 내 코드 시작
		/*let $content_list = $('<div/>').addClass('evaluate_content_list');
		let page = 1;
		$.getJSON($.ctx()+'/item/evaluate/id/'+page,d=>{//id는 로그인한 사람의 아이디, pagination하기
			console.log(d.list);
			$.each(d.list,(i,j)=>{
				let $content = $('<div/>').addClass('evaluate_content').appendTo($content_list);
				let $img = $('<img/>').addClass('evaluate_img').attr({src:j.image}).appendTo($content);
				let $overlay = $('<div/>').addClass('evaluate_overlay').appendTo($content);
				let $evaluate_title = $('<div/>').addClass('evaluate_title').appendTo($overlay);
				let $star_rating = $('<div/>').addClass('star_rating').appendTo($overlay);
				let $star_rating_container = $('<div/>').addClass('star_rating_container').appendTo($star_rating);
				let $span = $('<span/>').appendTo($star_rating_container);
				let $star_rating_rated_star = $('<div/>').addClass('star_rating_rated_star').appendTo($star_rating_container);
			});
		});
		page++; //페이지수 증가
		$('#content').empty().append(
				$content_list
		);*/
		//내 코드끝 
	};
	return {main:main}; 
})();












