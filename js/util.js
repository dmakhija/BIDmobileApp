function setDefaultDate(){
	var now = new Date();
    var month = (now.getMonth() + 1);               
    var day = now.getDate();
    if(month < 10) 
        month = "0" + month;
    if(day < 10) 
        day = "0" + day;
    var today = now.getFullYear() + '-' + month + '-' + day;	
	$("#ReviewDate").val(today);
}
function validateReview(){
	$("#AddReviewForm").validate({
			rules: {
				ReviewDate: {
					required:true					
				},
				
				ReviewComment: {					
					required:true,
					rangelength:[2,30]
				}
			},
			messages:{
				ReviewDate:{
					required:"Review date is required."					
				},
				ReviewComment:{
					required:"Review comment is required.",
					rangelength:"Characters length must be between 2 and 30 long."
				}
			}
			}
			);
			if($("#AddReviewForm").valid()){
				var serviceType=$('#serviceType').val();
				var ReviewDate=$("#ReviewDate").val();
				var ReviewComment=$("#ReviewComment").val();
				
				addFeedback(serviceType,ReviewDate,ReviewComment);
				return false;
			}
				
}
function updateReview() {
	var rowid = localStorage.getItem('data-row-id');	
	var service_id = $('#UpdateserviceType').val();  			  
	var comment = $('#ReviewCommentUpdate').val();  				
	var date = $('#ReviewDateUpdate').val();  			
	
	updateReviewRecord(rowid, service_id, date, comment);
}
function deleteReview(){
	var rowid = localStorage.getItem('data-row-id');	
	var result = confirm("This will delete this record. Continue delete?");
	if (result) {
		deleteReviewRecord(rowid);
		//$("#listViewShopCart").listview('refresh');
		$.mobile.changePage('#ShoppingCrt', { transition: 'slide' });
		}
}
