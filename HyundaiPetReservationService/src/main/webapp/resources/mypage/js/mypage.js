$(document).ready(function() {
    var buttonId = ''; // 버튼 ID 값을 저장할 변수
    
    $('#theadA').show();
    $('#theadB').hide();
    
    // 초기에 첫 번째 버튼을 활성화 상태로 설정
    $('#buttonA').addClass('active'); // 버튼 A를 활성화 상태로 표시

    $('#buttonA').click(function() {
        buttonId = $(this).attr('id'); // 버튼 A의 ID 값을 가져와서 buttonId에 할당
        $(this).addClass('active'); // 버튼 A를 활성화 상태로 표시
        $('#buttonB').removeClass('active'); // 버튼 B의 활성화 상태 제거
        $('#theadA').show();
        $('#theadB').hide();
        // ... AJAX 요청 등 버튼 A에 대한 추가 동작 수행
        $.ajax({
            type: 'GET',
            url: '/thepet/mypage/reservajax',
            data: { buttonId: buttonId },
            success: function(response) {
                // 서버로부터의 응답을 처리하는 로직 작성
                updateTable(response);
            },
            error: function(error) {
                console.log(error);
                // AJAX 요청 실패 시 처리하는 로직 작성
            }
        });
    });

    $('#buttonB').click(function() {
        buttonId = $(this).attr('id'); // 버튼 B의 ID 값을 가져와서 buttonId에 할당
        $(this).addClass('active'); // 버튼 B를 활성화 상태로 표시
        $('#buttonA').removeClass('active'); // 버튼 A의 활성화 상태 제거
        // ... AJAX 요청 등 버튼 B에 대한 추가 동작 수행
        $('#theadB').show();
        $('#theadA').hide();
        $.ajax({
            type: 'GET',
            url: '/thepet/mypage/reservajax',
            data: { buttonId: buttonId },
            success: function(response) {
                // 서버로부터의 응답을 처리하는 로직 작성
                updateTable(response);
                
            },
            error: function(error) {
                console.log(error);
                // AJAX 요청 실패 시 처리하는 로직 작성
            }
        });
    });
});

//테이블 내용을 업데이트하는 함수
function updateTable(response) {
	
    var cnt = response.cnt;
    var reservList = Object.values(response)[2];
    var buttonId = response.button;
    //Object.values(response)[1]
    // 테이블 내용을 변경하는 코드 작성
    // 예시: 테이블의 tbody 요소를 선택하여 내용을 업데이트
    var tbody = $('.board-table tbody');
    tbody.empty(); // 기존 내용을 제거
    
    var cntt = $('.cntt');
    cntt.empty();
    cntt.html('총 ' +  cnt + '건');
    // 새로운 데이터로 테이블 내용을 구성
    for (var i = 0; i < cnt; i++) {
        var reserv = reservList[i];
        var reservationDate = new Date(reserv.reservationDate);
        var year = reservationDate.getFullYear();
        var month = reservationDate.getMonth() + 1;
        var day = reservationDate.getDate();
        var formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
        const cn1 = reserv.price.toLocaleString('ko-KR');
        console.log(reserv); // 확인: reserv 변수의 값 출력
        
        if (buttonId === 'buttonA') {
        	var row = $('<tr></tr>');
            row.append('<td>' + reserv.address + ' ' + reserv.addressDetail + '</td>');
            row.append('<td>' + reserv.dogFacilities + '</td>');
            row.append('<td>' + reserv.customerCount + '</td>');
            row.append('<td>' + reserv['dogName'] + '</td>');
            row.append('<td>' + formattedDate + '  '+ reserv.reservationStartTime+' ~ ' + reserv.reservationEndTime +'</td>');
            row.append('<td>' + cn1 + '원' + '</td>');
            row.append('<td><form action="/thepet/reservation/detail" method="GET"><input type="hidden" name="id" value="' + reserv.id + '"><input type="hidden" name="reservationId" value="' + reserv.reservationId + '"><button type="submit">리뷰확인</button></form></td>');
            tbody.append(row);
        }else{
        	let row = $('<tr></tr>');
            row.append('<td>' + reserv.address + ' ' + reserv.addressDetail + '</td>');
            row.append('<td>' + reserv['dogFacilities'] + '</td>');
            row.append('<td>' + reserv['customerCount'] + '</td>');
            row.append('<td>' + reserv['dogName'] + '</td>');
            row.append('<td>' + formattedDate + '  '+ reserv.reservationStartTime+' ~ ' + reserv.reservationEndTime + '</td>');
            row.append('<td>' + cn1 + '원' + '</td>');
            var buttonCell = $('<td></td>'); // 버튼을 담을 셀(td) 요소 생성
            $.ajax({
            	async: false, // 동기처리..
                type: 'GET',
                url: '/thepet/mypage/reviewcheck',
                data: { reservid: reserv.reservationId },
                success: function(response) {
                	console.log(response.check);
                    if (response.check>0) {
                    	buttonCell.append('<form action="/thepet/review/detail1" method="GET"><input type="hidden" name="dogId" value="' + reserv.dogId + '"><input type="hidden" name="id" value="' + reserv.id + '"><input type="hidden" name="reservationId" value="' + reserv.reservationId + '"><button type="submit">리뷰확인</button></form>');
                    } else {
                    	buttonCell.append('<form action="/thepet/review/write" method="GET"><input type="hidden" name="reservationId" value="' + reserv.reservationId + '"><input type="hidden" name="dogFacilities" value="' + reserv.dogFacilities + '"><input type="hidden" name="reservationDate" value="' + formattedDate + '"><input type="hidden" name="reservationStartTime" value="' + reserv.reservationStartTime + '"><input type="hidden" name="reservationEndTime" value="' + reserv.reservationEndTime + '"><button type="submit">리뷰작성</button></form>');
                    }
                    row.append(buttonCell); // 버튼 셀을 행에 추가합니다.
                },
                error: function(error) {
                    console.log(error);
                    
                }
            });
            
            tbody.append(row);
        }
        
    }
}

