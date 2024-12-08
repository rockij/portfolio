$(function () {

	/* allmenu js start */

	$('.allMenu li.stusign a, .dep2.stusign').hover( //수강생등록
		function(){
			$('.allMenu li.stusign').addClass('selected');
			$('.dep2.stusign').show();
		},
		function(){
			$('.allMenu li.stusign').removeClass('selected');
			$('.dep2.stusign').hide();
		}
	);
	$('.allMenu li.testadm a, .dep2.testadm').hover( //TEST관리
		function(){
			$('.allMenu li.testadm').addClass('selected');
			$('.dep2.testadm').show();
		},
		function(){
			$('.allMenu li.testadm').removeClass('selected');
			$('.dep2.testadm').hide();
		}
	);
	$('.allMenu li.unpayadm a, .dep2.unpayadm').hover( //미수금관리
		function(){
			$('.allMenu li.unpayadm').addClass('selected');
			$('.dep2.unpayadm').show();
		},
		function(){
			$('.allMenu li.unpayadm').removeClass('selected');
			$('.dep2.unpayadm').hide();
		}
	);
	$('.allMenu li.unpayadm a, .dep2.unpayadm').hover( //미수금관리
		function(){
			$('.allMenu li.unpayadm').addClass('selected');
			$('.dep2.unpayadm').show();
		},
		function(){
			$('.allMenu li.unpayadm').removeClass('selected');
			$('.dep2.unpayadm').hide();
		}
	);
	$('.allMenu li.nopayadm a, .dep2.nopayadm').hover( //미지급금관리
		function(){
			$('.allMenu li.nopayadm').addClass('selected');
			$('.dep2.nopayadm').show();
		},
		function(){
			$('.allMenu li.nopayadm').removeClass('selected');
			$('.dep2.nopayadm').hide();
		}
	);
	$('.allMenu li.sytadm a, .dep2.sytadm').hover( //시설관리
		function(){
			$('.allMenu li.sytadm').addClass('selected');
			$('.dep2.sytadm').show();
		},
		function(){
			$('.allMenu li.sytadm').removeClass('selected');
			$('.dep2.sytadm').hide();
		}
	);
	/* //수강신청 */

	$('.allMenu li.salesHits a, .dep2.salesHits').hover( //매출조회
		function(){
			$('.allMenu li.salesHits').addClass('selected');
			$('.dep2.salesHits').show();
		},
		function(){
			$('.allMenu li.salesHits').removeClass('selected');
			$('.dep2.salesHits').hide();
		}
	);
	$('.allMenu li.confirmHist a, .dep2.confirmHist').hover( //승인조회
		function(){
			$('.allMenu li.confirmHist').addClass('selected');
			$('.dep2.confirmHist').show();
		},
		function(){
			$('.allMenu li.confirmHist').removeClass('selected');
			$('.dep2.confirmHist').hide();
		}
	);
	$('.allMenu li.countEnd a, .dep2.countEnd').hover( //정산마감
		function(){
			$('.allMenu li.countEnd').addClass('selected');
			$('.dep2.countEnd').show();
		},
		function(){
			$('.allMenu li.countEnd').removeClass('selected');
			$('.dep2.countEnd').hide();
		}
	);
	$('.allMenu li.teacherCount a, .dep2.teacherCount').hover( //강사료정산
		function(){
			$('.allMenu li.teacherCount').addClass('selected');
			$('.dep2.teacherCount').show();
		},
		function(){
			$('.allMenu li.teacherCount').removeClass('selected');
			$('.dep2.teacherCount').hide();
		}
	);
	/* //정산정보 */
	$('.allMenu li.hakSurvey a, .dep2.hakSurvey').hover( //해커스Survey
		function(){
			$('.allMenu li.hakSurvey').addClass('selected');
			$('.dep2.hakSurvey').show();
		},
		function(){
			$('.allMenu li.hakSurvey').removeClass('selected');
			$('.dep2.hakSurvey').hide();
		}
	);
	$('.allMenu li.stueStats a, .dep2.stueStats').hover( //학사통계
		function(){
			$('.allMenu li.stueStats').addClass('selected');
			$('.dep2.stueStats').show();
		},
		function(){
			$('.allMenu li.stueStats').removeClass('selected');
			$('.dep2.stueStats').hide();
		}
	);
	$('.allMenu li.salesAnalysis a, .dep2.salesAnalysis').hover( //매출분석
		function(){
			$('.allMenu li.salesAnalysis').addClass('selected');
			$('.dep2.salesAnalysis').show();
		},
		function(){
			$('.allMenu li.salesAnalysis').removeClass('selected');
			$('.dep2.salesAnalysis').hide();
		}
	);
	/* //경영정보 */
	$('.allMenu li.codeadm a, .dep2.codeadm').hover( //코드관리
		function(){
			$('.allMenu li.codeadm').addClass('selected');
			$('.dep2.codeadm').show();
		},
		function(){
			$('.allMenu li.codeadm').removeClass('selected');
			$('.dep2.codeadm').hide();
		}
	);
	/* //시스템 관리 */

	/* allmenu js end */

});