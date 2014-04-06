/*
*  Program: BIDdatabase.js
*  Purpose: Handles all database functions and queries
*  @author BID 
*  Created: 2014-02-18
*/

var BIDTSSdb = openDatabase('BIDTSSdb', '1.0', 'BIDTSSdb', 2 * 1024 * 1024);


//create tables
function createTables()
{
BIDTSSdb.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS Category (id PIMARY KEY , name, image, description)", null, sR, errorHandler);
        tx.executeSql("CREATE TABLE IF NOT EXISTS Service (id INTEGER PRIMARY KEY AUTOINCREMENT, category_id, name, duration, price, description)", null, sR, errorHandler);
        tx.executeSql("CREATE TABLE IF NOT EXISTS CartItem(id INTEGER PRIMARY KEY AUTOINCREMENT, service_id)", null, sR, errorHandler);
        tx.executeSql("CREATE TABLE IF NOT EXISTS Feedback (id INTEGER PRIMARY KEY AUTOINCREMENT, service_id, date, comment)", null, sR, errorHandler);
        tx.executeSql("CREATE TABLE IF NOT EXISTS Promotion (id INTEGER PRIMARY KEY AUTOINCREMENT, name, service_id, discountRate, description)", null, sR, errorHandler);
        tx.executeSql("CREATE TABLE IF NOT EXISTS Tips (id INTEGER PRIMARY KEY AUTOINCREMENT, name, category_id, description)", null, sR, errorHandler);
       }); //end of create table
}


//insert into category table
 function insertCategory(){
    BIDTSSdb.transaction(function (tx) {
        tx.executeSql("SELECT * from Category where id = ?", ['H'],
        function(tx, res) {
            if (res.rows.length == 0) {
                                                
                tx.executeSql("INSERT INTO Category (id, name, image, description) VALUES(?, ?,?, ?)", ['H', 'Hair', "images/face-icon.png", "all related to hair"], null, errorHandler);
                tx.executeSql("INSERT INTO Category (id, name, image, description) VALUES(?, ?,?, ?)", ['N', 'Nail', "images/nail-polish-icon.png", "all nail care"], null, errorHandler);
                tx.executeSql("INSERT INTO Category (id, name, image, description) VALUES(?, ?,?, ?)", ['S', 'Spa', "images/Plants-Trees-Flower-icon.png", "all skin care"], null, errorHandler);
                tx.executeSql("INSERT INTO Category (id, name, image, description) VALUES(?, ?,?, ?)", ['P', 'Package', "images/Folder-Picture-icon.png", 'to be updated'], null, errorHandler);
                tx.executeSql("INSERT INTO Category (id, name, image, description) VALUES(?, ?,?, ?)", ['M', "Make-up", "images/eye-icon.png", 'all facial transformation'], null, errorHandler);
                    
            }
          else{
              //alert('data exist');
          }
        },
        errorHandler);
        
    }); 
    }//end of category insert
    
    
  
      //insert into type table
 function insertTips(){
    BIDTSSdb.transaction(function (tx) {
    	tx.executeSql("SELECT * from Tips where name = ?", ['How to Properly Apply Concealer:'],
        function(tx, res) {
            if (res.rows.length == 0) {
    	var longdesc = "Prevent frizz by using a paper towel to gently wring water from your "
    	+"strands post-shower, suggests Adir Abergel, Fekkai celebrity stylist." +
    	 "'<br />The paper won’t create as much friction as a towel, so your hair ends up less frizzy."+
    	 "It also absorbs more water than a cloth towel, really speeding up your drying time,'" + 
    	 "he explains.";
    	 tx.executeSql("INSERT INTO Tips (name, category_id, description) VALUES(?, ?, ?)",
    	  ['How to Properly Apply Concealer:', 'S', 
    	  "put a bit of concealer on the pad of a finger and pat it in. Never rub. "
    	  +"<br />Got acne? Gently tap the concealer over the blemishes and then set it with powder."],
    	   null, errorHandler);
    	   tx.executeSql("INSERT INTO Tips (name, category_id, description) VALUES(?, ?, ?)", 
    	   ['Squeeze-dry your hair', 'H', longdesc], null, errorHandler);
    	   tx.executeSql("INSERT INTO Tips (name, category_id, description) VALUES(?, ?, ?)",
    	   ['Repurposed Plastic Spoon', 'M', "Use a plastic spoon to easily apply mascara on your bottom lashes without"
    	   +" getting any on the skin under your eyes. <br /> It also helps you to accomplish a much thicker coat."], 
           null, errorHandler);
           }
        });
                        
    }); 
    }//end of tips insert
    
//insert into service
function insertService()
{
    var sqlSelect="SELECT * FROM Service;";
    if(sqlSelect==null)
    {
        //some records are already in the table
        //fetch last insert id
        //then add new records 
    }
    else
    {
        //no records found in the table
        //start inserting new records now
        var sqlInsert="INSERT INTO Service(category_id, name, duration, price, description) Values (?,?,?,?,?)";
        
        BIDTSSdb.transaction(function(tx){
        	tx.executeSql("SELECT * from Service where category_id = ?", ["H"],
        function(tx, res) {
            if (res.rows.length == 0) {
            tx.executeSql(sqlInsert, ["H","Straightening","00:30","$19","straight hair in few minutes."], sR, errorHandler);
            tx.executeSql(sqlInsert, ["H","Colour","01:30","$45","Hair Colour Description."],sR,errorHandler);
            tx.executeSql(sqlInsert, ["H","Full HighLights","00:45","$85","Full HighLights Description."], sR,errorHandler);
            tx.executeSql(sqlInsert, ["H","Blow-Dry & Styling","01:10","$19","blow dry your hair and get them styled."],sR,errorHandler);
            tx.executeSql(sqlInsert, ["H","Updos","00:35","$50","updos that suits your face."],sR,errorHandler);
            tx.executeSql(sqlInsert, ["N","Natural Manicure","00:30","$25","Natural Manicure Description."],sR,errorHandler);
            tx.executeSql(sqlInsert, ["N","French Manicure","00:30","$35","French Manicure Description."],sR,errorHandler);
            tx.executeSql(sqlInsert, ["N","French Pedicure","00:40","$35","French Pedicure Description."],sR,errorHandler);
            tx.executeSql(sqlInsert, ["N","Nail Art","00:30","$40","Nail Art Description."],sR,errorHandler);
            tx.executeSql(sqlInsert, ["M","Full Make-Up","02:00","$60","simple, classic and dramatic make-up."],sR,errorHandler);
            tx.executeSql(sqlInsert, ["M","Eye Make-Up","00:20","$30","eye make-up."],sR,errorHandler);
            tx.executeSql(sqlInsert, ["M","Eyebrow & Lash Tint","00:40","$29","shade your eyebrows and eye lashes for the special day."],sR,errorHandler);
            tx.executeSql(sqlInsert, ["M","Eye Lash Extension","00:10","$19","Extend your eye lashes and make them look more beautiful."],sR,errorHandler);
            tx.executeSql(sqlInsert, ["M","Eye Lash Perm","00:30","$20","perm your eye lashes."],sR,errorHandler);
            tx.executeSql(sqlInsert, ["S","Facial","01:20","$50","Age Defying Facial Description."],sR,errorHandler);
            tx.executeSql(sqlInsert, ["S","Massage","02:00","$100","Relaxation Massage Description."],sR,errorHandler);
            tx.executeSql(sqlInsert, ["S","Leg Wax","00:30","$30","Leg Wax Description."],sR,errorHandler);
            tx.executeSql(sqlInsert, ["S","Hand Wax","00:20","$20","Hand Wax Description."],sR,errorHandler);
            tx.executeSql(sqlInsert, ["S","UnderArms","00:15","$15","UnderArms Description."],sR,errorHandler);
            tx.executeSql(sqlInsert, ["S","Eyebrow","00:15","$10","Eyebrow Description."],sR,errorHandler);
            tx.executeSql(sqlInsert, ["P","Bridal Package","48:00","$500","Wax, Manicure, pedcure, hair style, facial massage, make-up."],sR,errorHandler);
            tx.executeSql(sqlInsert, ["P","Groom Package","24:00","$400","Full Body Wax, Spa Manicure, Spa Pedicure, Facial, Massage."],sR,errorHandler);
        }//end of insert categories
        });
        });
    }
    
}

//insert promotion
function insertPromotion()
{
    var sqlSelect="SELECT * FROM Promotion;";
    if(sqlSelect==null)
    {
        //some records are already in the table
        //fetch last insert id
        //then add new records 
    }
    else
    {
        //no records foound in the table
        //start inserting new records now
       // var sqlInsert="INSERT INTO Promotion(name, service_id, discountRate, description) Values (?,?,?,?)";
        BIDTSSdb.transaction(function(tx){
        	tx.executeSql("SELECT * from Promotion where name = ?", ["Valentine"],
        function(tx, res) {
        	var sqlInsert="INSERT INTO Promotion(name, service_id, discountRate, description) Values (?,?,?,?)";
            if (res.rows.length == 0) {
        BIDTSSdb.transaction(function(tx){
            tx.executeSql(sqlInsert, ["Valentine","1","30%","Valentine's Day Special offer.Get 30% off."], sR, errorHandler);
            tx.executeSql(sqlInsert, ["Christmas","2","10%","Christmas Special Offer Description.Get 10% off."],sR,errorHandler);
            tx.executeSql(sqlInsert, ["New Year","3","50%","New Year Offer Description.Get 50% off."], sR,errorHandler);
            tx.executeSql(sqlInsert, ["Fall","4","25%","Offer Description.Get 25% off."],sR,errorHandler);
            tx.executeSql(sqlInsert, ["Spring","5","20%","Offer Description.Get 20% off."],sR,errorHandler);
            tx.executeSql(sqlInsert, ["Summer","6","60%","Summer Offer Description.Get 60% off."],sR,errorHandler);
        });//end of insert categories
        }
        });
        });        
    }   
    
}

/* Remove entire table */
// to clear all records (run in Console)

function dropTips() {
    var query = 'DROP TABLE Tips;';
    try {
        BIDTSSdb.transaction(function (transaction) {
            transaction.executeSql(query, [], null, errorHandler);
        });
        
       // alert("table tips has been deleted from the database");
    }
    catch (e) {
        alert("Error: Unable to drop table " + e + ".");
        return;
    }
}

//drop Category Table
function dropCategory()
{
    var sqlDrop = "DROP TABLE Category;";   
    BIDTSSdb.transaction(function (tx) {
        tx.executeSql(sqlDrop, [], null, errorHandler);
    });
 }

//drop Service Table
function dropService()
{
    var sqlDrop = "DROP TABLE Service;";    
    BIDTSSdb.transaction(function (tx) {
        tx.executeSql(sqlDrop, [], null, errorHandler);
    });
}

//drop CartItem Table
function dropPromotion()
{
    var sqlDrop = "DROP TABLE Promotion;";   
    BIDTSSdb.transaction(function (tx) {
        tx.executeSql(sqlDrop, [], null, errorHandler);
    });
}

//show_tips function
function ShowTips()
{  
    BIDTSSdb.transaction(function(tx){ 
      
      tx.executeSql("SELECT * FROM Tips", null, 
      function(tx, results)
      {
             GetTipsCategories(results);
       }, errorHandler);
  }); 
}

function GetTipsCategories(tipsResults)
{
   BIDTSSdb.transaction(function(tx){ 
       
       tx.executeSql("SELECT id, name FROM Category order by id",null,
       function(tx, categoryResults){ShowTipsSuccess(categoryResults, tipsResults);},
       errorHandler);
 });  
}

//fxn categories for category page
function GetCategories(){ 
    
    var query = "SELECT id, name, image FROM Category order by id";
    
    BIDTSSdb.transaction(function(tx){
        tx.executeSql(query, null, 
            function(tx, result){
            onGetCategoriesSuccess(result);
        }, errorHandler);
    });
}

function ListServices(categoryId){
    
    BIDTSSdb.transaction(function(tx){
        tx.executeSql("SELECT * FROM Service WHERE category_id =?", [categoryId], 
            function(tx, result){
            onListServicesSuccess(result);   
             
             }, errorHandler);
    });
}
//show_promotions function
function ShowPromotions()
{
    //alert("promotions");
       
  BIDTSSdb.transaction(function (tx) { 
      
      tx.executeSql("SELECT * FROM Promotion", null, 
       function(tx, results)
      { onShowPromoSuccess(results);
       },
      errorHandler);      
      
      }); 
}

function onShowPromoSuccess(results){
    var htmlStr ="";
    //var htmlStrSet="";
      var aRow = null;   
   
            if(results.rows.length === 0)
            {
                alert("Check back later for more promotions!");
               // htmlStrSet+='<h4>Check back later for more promotions!</h4>';
            }
          
               // alert("promos found");
                //some promotions found, so use collapsibleset for display
               // htmlStrSet += '<div data-role="collapsibleset" data-theme="a" data-content-theme="a">';
               
                for(var i = 0; i < results.rows.length; i++)
                {
                    
                    
                    aRow = results.rows.item(i);
                       
                       //add collapsible divisions for each promotion in the collapsible set
                htmlStr += '<div data-role="collapsible" data-collapsed="true" >'
                         +'<h2>' + aRow['name'] + '</h2>'
                         +'<p>' + aRow['description'] + '</p>'
                         +'</div>' ;  
                         
                    
               
                           //alert(htmlStr);           
                 } // end for                
                //htmlStrSet += htmlStr + '</div>' ;
                //alert(htmlStrSet);
     
         //var info = '<p>All  promotions is available in any of our store <a href=#FindUs>location</a> </p>';
         //append html to the content section
        $("#promos").empty();
         $("#promos").append(htmlStr);
       $("#promos").collapsible().trigger('create');
         
}


//-------------SUCCESS FUNCTIONS-----------------------------

function sR()
{
   //alert('action was successful');
}

//ongetcategoriessuccess
function onGetCategoriesSuccess(result){
    var htmlStr ="";
    var aRow = null;
  
    if(result.rows.length == 0)
    alert("there is no category in this database");
   
        for(var i = 0; i < result.rows.length; i++)
        {  
            aRow = result.rows.item(i);
            
        htmlStr += '<li data-icon="arrow-r" class="categorylist" data-mini="true"' 
                + 'data-row-id ="' + aRow['id'] + '">'
                + '<a href="#'  +aRow['name'] + '" >'
                + '<img src="' + aRow['image'] + '" />' 
                +'<h2>' + aRow['name']
                +'</h2>'     
                +'</a>'
                +'</li>';                
   
        }//end for
    $.mobile.changePage('#Category', { transition: 'slide' });
    $("#listViewCategory").empty();
    $("#listViewCategory").append(htmlStr);
    $("#listViewCategory").listview('refresh');
     
    
     // event handler for listview items
    $(".categorylist").click(function () {
      var  id = this.getAttribute('data-row-id');       
       
        // save to localStorage: id is not editable
        localStorage.setItem('data-row-id', id);
        ListServices( id );
     });
    
} // end getcategorysuccess fxn


//onListServicesSuccess function
function onListServicesSuccess(result){
    var htmlStr ="";
    var aRow = null;
 	var image = '';
    if(result.rows.length === 0)
    alert("there is no category in this database");
   
        for(var i = 0; i < result.rows.length; i++)
        {  
        aRow = result.rows.item(i);
        if(!onFindCartRecord(aRow['id'])){
        	image = '<img class="cartadd" src="images/shop-cart-add.png" />';
        }
        else{
        	image ='<img class="cartadd" src="images/shop-cart-exclude-icon.png" />';
        }
        htmlStr += '<li data-row-id ="' + aRow['id'] + '"'
                + 'class="add-service" data-mini="true" data-icon="false">' 
                +'<a href="#cart">'              
                + '<h2>'  +aRow['name'] + '</h2>'
                + '<p>Price: ' 
                + aRow['price'] +'<br />'
                +'Estimated time: ' +aRow['duration']
                +'<br />' 
                + image
                +'Description: ' +aRow['description'] +'</p>'
                +'</a>'
                +'</li>'; 
                                           
   			
        }//end for
        
        $.mobile.changePage('#Services', { transition: 'slide' });
        $("#listViewServices").empty();
    	$("#listViewServices").append(htmlStr);
    	$("#listViewServices").listview('refresh');    
    
     // event handler for listview items
    $(".add-service").click(function () {
      var  id = this.getAttribute('data-row-id');  
      var img = $(this).find("img.cartadd") ;
      if(img.attr('src') == "images/shop-cart-add.png") {
  		 AddToShoppingCart(id);  		
  		 img.attr('src',"images/shop-cart-exclude-icon.png");
		} else
		 {
  			img.attr('src',"images/shop-cart-add.png");
  			onDeleteItemRecordFromCart(id);
		}     
      
        // save to localStorage: id is not editable
        localStorage.setItem('data-row-id', id);
        //addToCart( id );
     });
  
}
function onDeleteItemRecordFromCart(id){
	var result = confirm("This will delete this record from shopping cart. Continue delete?");
	if (result) {
	BIDTSSdb.transaction(function (tx) { 
		tx.executeSql("DELETE FROM CartItem WHERE service_id = ?",[id],sR,errorHandler);
		ShoppingCartItem();
		$("#listViewShopCart").listview('refresh');		
		});
	}
	else{
		//$.mobile.changePage('#ShoppingCrt', { transition: 'none' });
	}
}
function onFindCartRecord(id){	
	BIDTSSdb.transaction(function (tx) { 
		tx.executeSql("SELECT service_id FROM CartItem WHERE service_id = ?",[id],
		function(transaction, results) {
			if(results.rows.length == 0){
				var bool = false;
			}
			else{
				var bool = true;
			}
			return bool;
		}
			,errorHandler);			
	});	
}
//show tips success
function ShowTipsSuccess(categoryResults, results){
      var htmlStr ="";
      var aRow = null;
      var acategoryRow = null;
      var acategoryName = null;
      
            if(results.rows.length == 0){
                alert("really? something isn't right, try refreshing");
            }
              for(var i =0; i < results.rows.length; i++)
              {
                  aRow = results.rows.item(i);
                  for(var j = 0; j < categoryResults.rows.length; j++){
                     acategoryRow = categoryResults.rows.item(j);
                  if(aRow['category_id'] ==  acategoryRow['id'])
                  {
                  acategoryName = acategoryRow['name'];
                  //break;
                  }// end of if inside j for loop
                  }// end of j for loop                 
                  
                  htmlStr += '<div data-role="collapsible" data-collapsed="true" >'
                          + '<h2>' + acategoryName +'</h2>'
                          + '<h4>' + aRow['name'] + '</h4>'
                          + '<p>' + aRow['description'] + '</p>'
                          + '</div>';
              } // end of i for loop
              
            $("#tips_list").empty();
    $("#tips_list").append(htmlStr);
     $("#tips_list").collapsible().trigger('create');
       
              
          }//end  function



//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//success functions

function errorHandler(transaction, error) {
    alert("SQL error: " + error.message);
}

function addFeedback(service_id, date, comment){
	var query="INSERT INTO Feedback (service_id, date,comment) VALUES(?,?,?)";
	BIDTSSdb.transaction(function (tx) { 
		tx.executeSql(query, [service_id, date, comment],
			 function (transaction, respns) {
                    onAddSuccess( respns );
                },errorHandler);
	});	
}
function onAddSuccess( respns ) {
    alert("New review is added.");
    $("#ShowReview").listview('refresh');

    getFeedback();
    $.mobile.changePage('#Reviews', { transition: 'slide' });
}
function getFeedback(){
	BIDTSSdb.transaction(function (tx) {       
      tx.executeSql("SELECT * FROM Feedback", null, 
      function(tx, results){getCategoryName(results), results}
    ,errorHandler);
    
  });
      	
}
function ShowFeedback(categoryResults, feedbackresults){
	var htmlStr = '';
    var aRow = null;
    var bRow = null;
    var name = '';
    
    for (var i = 0; i < feedbackresults.rows.length; i++) {
    	aRow =feedbackresults.rows.item(i);
    for(var j=0;j<categoryResults.rows.length;j++){
    	bRow = categoryResults.rows.item(j);    	
    	if(bRow['id']==aRow['service_id'])	{
    		name = bRow['name'];
    	}
    }
	//(aRow['service_id']);
		// Note: store the PK (id) as data-row-id attribute	
        htmlStr += '<li class="listviewItem" '
            + 'data-row-id="' + aRow['id'] 
        	+ '">'
            + '<a href="#UpdateReviews">'
            + '<h4>'
            + name
            +'</h4>'
            +'<p>'
            + aRow['date']
            + aRow['comment']
            + '</p>'
            + '</a>'
			+ '</li>';
   }
   
    $("#ShowReview").empty();
    $("#ShowReview").append(htmlStr); 
   
    $(".listviewItem").click(function () {
        var id = this.getAttribute('data-row-id');       
        
        // save to localStorage: id is not editable
        localStorage.setItem('data-row-id', id);
        findReviewRecord( id );
     });          
     $("#ShowReview").listview('refresh');
       
}
function getCategoryName(feedbackres){
	BIDTSSdb.transaction(function (tx) {		
		tx.executeSql("SELECT id,name FROM Category ORDER BY id",null,
		 function(tx, res){ShowFeedback(res,feedbackres)}
		,errorHandler);
	});
	
}
function findReviewRecord( id ) {
    BIDTSSdb.transaction(function (transaction) {
        transaction.executeSql("SELECT * FROM Feedback WHERE id = ?",
				[ id ],
                function (transaction, results) { onFindReviewRecordSuccess(results) },
                errorHandler);
    });
}
function onFindReviewRecordSuccess(results) {     
    var aRow = null;

    if (results.rows.length > 0) {
    	// only one row expected
        aRow = results.rows.item(0);
        
        // populate edit form input fields
       	$('#ReviewDateUpdate').val( aRow['date'] );   
       	$('#ReviewCommentUpdate').val( aRow['comment'] );  
       //	get_ServiceType();
       get_ServiceTypeUpdate(aRow['service_id']);
		$('#UpdateserviceType').val(aRow['service_id'] );
    }
    
    $.mobile.changePage('#UpdateReviews', { transition: 'none' });
}
function get_ServiceTypeUpdate(id) {	
	BIDTSSdb.transaction(function (tx) {		
		tx.executeSql("SELECT * FROM Category", null,
		function(tx, res) {
			if (res.rows.length == 0) {
			}
			else
			{	
				var len = res.rows.length;				
				var code = "";				
				for (var i = 0; i < len; i++){					
					if (res.rows.item(i).id == id) {
						code = code + '<option selected="TRUE" class="serviceTypeDropDown" value="'+res.rows.item(i).id+'" id="'+res.rows.item(i).id+'">'+res.rows.item(i).name+'</option>';
					}
					else
					{
						code = code + '<option value="'+res.rows.item(i).id+'">'+res.rows.item(i).name+'</option>';
					}		
				}	
				$("#UpdateserviceType").html(code);		
				$("#UpdateserviceType").selectmenu('refresh',true);
			}
		},
		errorHandler);
	});
}

function get_ServiceType() {
	
	BIDTSSdb.transaction(function (tx) {
		tx.executeSql("SELECT * FROM Category ORDER BY id DESC", null,
		function(tx, res) {
			if (res.rows.length == 0) {
			}
			else
			{	
				var len = res.rows.length;				
				var code = "";
				
				for (var i = 0; i < len; i++){					
					if (i == 0) {
						code = code + '<option selected="TRUE" class="serviceTypeDropDown" value="'+res.rows.item(i).id+'" id="'+res.rows.item(i).id+'" >'+res.rows.item(i).name+'</option>';
					}
					else
					{
						code = code + '<option value="'+res.rows.item(i).id+'">'+res.rows.item(i).name+'</option>';
					}		
				}	
					
				$("#serviceType").html(code);
			}
		},
		errorHandler);
	});
}
function dropFeedbackTable() {
    var query = "DROP TABLE Feedback";
    try {
        BIDTSSdb.transaction(function (tx) {
            tx.executeSql(query, [], sR, errorHandler);
        });
    }
    catch (e) {
        alert("Error: Unable to drop table " + e + ".");
        return;
    }
}
function onUpdateSuccess( response ) {
    alert("Review is updated.");
    //$("#ShowReview").listview('refresh');

    getFeedback();
    $.mobile.changePage('#Reviews', { transition: 'slide' });
}

function updateReviewRecord(rowid, service_id, date, comment) {
    var sqlString = "UPDATE Feedback SET service_id = '" + service_id
        + "', date = '" + date
        + "', comment = '" + comment
        + "' WHERE id = " + rowid + ";";

    BIDTSSdb.transaction(function (transaction) {
        transaction.executeSql(
                sqlString,
                [],
                function (transaction, response) {
                    onUpdateSuccess( response );
                },
                errorHandler
            ); // executeSql
    });

} // end update
function deleteReviewRecord(rowid) {
    var sqlString = "DELETE FROM Feedback" 
        + " WHERE id = " + rowid + ";";

    BIDTSSdb.transaction(function (transaction) {
        transaction.executeSql(
                sqlString,
                [],
                function (transaction, res) {
                    onDeleteSuccess(res);
                },
                errorHandler
            ); // executeSql
    });
}
function onDeleteSuccess(res){
	alert("Review is deleted.");
    //$("#ShowReview").listview('refresh');

    getFeedback();
    //$.mobile.changePage('#Reviews', { transition: 'slide' });
   
}
/*function findServiceRecord( response ) {
    BIDTSSdb.transaction(function (transaction) {
        transaction.executeSql("SELECT * FROM Service",
				null,
                function (transaction, results) { onFindServiceRecordSuccess(results,response); },
                errorHandler);
    });
}
function onFindServiceRecordSuccess(ServiceResults,ShoppingCartResults) {     
    var aRow = null;
    var bRow = null;
	var htmlStr = '';
	var name = '';
	var duration = '';
	var price = '';
	var description = '';
	
   // if (shoppingCartResults.rows.length > 0) {
    for (var i = 0; i < ShoppingCartResults.rows.length; i++) {
    	aRow =ShoppingCartResults.rows.item(i);
    for(var j=0;j<ServiceResults.rows.length;j++){
    	bRow = ServiceResults.rows.item(j);    	
    	if(bRow['id']==aRow['service_id'])	{
    		name = bRow['name'];
    		duration = bRow ['duration'];
    		price = bRow['price'];
    		description = bRow['description'];    		
    	}
    }
	//(aRow['service_id']);
		// Note: store the PK (id) as data-row-id attribute	
  
    	// only one row expected
       // aRow = response.rows.item(0);
        htmlStr += '<li class="listviewItem" '
            + 'data-row-id="' + aRow['service_id'] 
        	+ '">'
            + '<h4>'
            + name
            +'</h4>'
            +'<p>'
            + duration
            + price
            + description
            + '</p>'
			+ '</li>';
			
			$("#listViewShopCart").empty();
			$("#listViewShopCart").append(htmlStr);   
    //}
    }
     $("#listViewShopCart").listview('refresh');
  //  $.mobile.changePage('#ShoppingCrt', { transition: 'none' });
}*/
function AddToShoppingCart(id){
var query="INSERT INTO CartItem (service_id) VALUES(?)";
	BIDTSSdb.transaction(function (tx) { 
		tx.executeSql(query, [id],
			 sR,errorHandler);
	});	
}
/*function ShoppingCartItem(){
	var query = "SELECT * FROM CartItem";
	BIDTSSdb.transaction(function (tx) { 
		tx.executeSql(query, null,
			 function (tx, response) { findServiceRecord(response),response }
			 ,errorHandler);
	});	
}*/
function ShoppingCartItem(){
	var query = "SELECT CartItem.*, Service.* FROM CartItem INNER JOIN Service ON Service.id= CartItem.service_id";
	BIDTSSdb.transaction(function (tx) { 
		tx.executeSql(query, null,	
			function(tx, res) {
			if (res.rows.length == 0) 
			{
				$("#listViewShopCart").empty();
				$.mobile.changePage('#ShoppingCrt', { transition: 'none' });
			}
			else
			{
				var len = res.rows.length;
				var aRow = null;				
				var code = "";				
				var total=0;
				
				for (var i = 0; i < len; i++){
					aRow = res.rows.item(i);
							
					var price = aRow['price'];
				price = price.substr(1);

					code += "<li><a href='#' onclick='onDeleteItemRecord("+res.rows.item(i).id+");'>"
						+'<h4>Name: '+aRow['name']+'</h4>'
						+'<p>Duration: '+aRow['duration']
						+'<br > Price: '+aRow['price']
						+'<br > Description: '+aRow['description']
						+'</p>'
						+'</a>'
						+'</li>';	
						total+=Number(price);
				}
				
				$("#listViewShopCart").empty();
				$("#listViewShopCart").append(code); 
				$("#total").val("Total: $"+total);
				$("#listViewShopCart").listview('refresh');  		
			}
		},
			errorHandler);
	});	
}
function onDeleteItemRecord(id){
	var result = confirm("This will delete this record. Continue delete?");
	if (result) {
	BIDTSSdb.transaction(function (tx) { 
		tx.executeSql("DELETE FROM CartItem WHERE id = ?",[id],sR,errorHandler);
		 ShoppingCartItem();
		//$("#listViewShopCart").listview('refresh');		
		});
	}
	else{
		$.mobile.changePage('#ShoppingCrt', { transition: 'none' });
	}
	
}
function clearAllShoppingCart(){
	var clearAllconfirm = confirm("This will delete all the records from shopping cart. Continue delete?");
	if(clearAllconfirm) {
		BIDTSSdb.transaction(function (tx) { 
		tx.executeSql("DROP TABLE CartItem;",null,sR,errorHandler);
		createTables();
		ShoppingCartItem();		
		});
	}
	else{
		
		ShoppingCartItem();
	}
}
function calculateTotalItem(){
	
}
