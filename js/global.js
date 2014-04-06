
$(window).bind('hashchange', function(e){
    
    newHash = window.location.hash.substring(1);
    
    if (newHash) {
        if (newHash == "FindUs") {
            alert("map");
            getLocation();
        }
        else if (newHash == "Category") {
         GetCategories();
        }
       else if (newHash == "Services") {
          ListServices(localStorage.getItem('data-row-id'));
        }
       else if (newHash == "Tips") {
           ShowTips();
        }
        else if(newHash == "Promotions")
        {
            ShowPromotions();
        }
    }
    else {
        //grabActivity();
    }
});
/*
function errorHandler(transaction, error){
   alert("SQL error: " + error.message);
             }*/

$(document).ready(function(){
	//dropCategory();
	//dropTips();
	//dropService();
	//dropPromotion();
	createTables();
	insertCategory();
	insertTips();
	insertService();
	insertPromotion();
	$(".ShoppingCartPage").on("tap",ShoppingCartItem);
	ShowTips();
	getFeedback();
	//ShoppingCartItem();
	$('#show_tips').on('tap', ShowTips());
	 $('#show_promotions').on('tap', ShowPromotions());
	//$("#show_servicecategory").on("tap",GetCategories());
	//ShowFeedback(results);
	get_ServiceType();
	setDefaultDate();
	$("#btnAddReview").on("tap",validateReview);
	$("#btnDeleteReview").on("tap",deleteReview);
	$("#btnDeleteAllReviews").on("tap",dropFeedbackTable);
	$("#btnUpdateReview").on("tap",updateReview);
	$("#cCart").on("tap",clearAllShoppingCart);
	
});
