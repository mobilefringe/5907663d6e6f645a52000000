function init() {
    function search_site(){
        if($("#SearchTerms").val() != ""){
            window.location.href = "/search?query=" + $("#SearchTerms").val();
        }
    }
    
    function toggle_dropdown(){
        $(".dropdown-menu").toggle();
    }
    $(".btn-nav").hover(function() {
        var id = $(this).attr('id'); 
        console.log(id);
        animate_dropdown(id);
    })
    function animate_dropdown(id){
        // if ($("#"+id).is(":visible")){
        //     $("#"+id).slideUp();
        // } else {
            if ($(".dd_animated").is(":visible")){
                $(".dd_animated").slideUp();
                $(".btn-nav").css({"background-color":"#da5840", "font-family":"verdana"});
               
                $("#btn-"+id).css({"background-color":"#a82911" ,"font-family":"verdana"});
                 $("#"+id).slideDown();
            } else {
                
                $("#btn-"+id).css({"background-color":"#a82911" ,"font-family":"verdana"});
                $("#"+id).slideDown(); 
            }
        // }
    }
    
    function side_subscribe_email(){ 
        if (isValidEmailAddress($("#side_subscribe_email").val())){            
            var data = {}
            var contest = {}
            contest["email"] = $("#side_subscribe_email").val();
            contest["newsletter"] = true;
            contest["property_id"] = 51;
            data["contest"] = contest
            data["notice"] = "false"
            $.ajax({
                url: "/newsletter_no_captcha",
                type: "POST",
                data: data,
                success: function(response){                    
                    alert("Thank you for signing up.");
                },
                error: function(xhr, ajaxOptions, thrownError){
                    alert("Please try again later.");
                }
            })    
        } else {
            alert("Please enter a valid email address. ")
        }
    }
}

function show_content() {
    var home_feature_items = getFeatureList();
    renderFeatureItems("#home_feature_item_container", "#home_feature_item_template", home_feature_items);
    
    var promo_list = getPromotionsList();
    var side_promos = promo_list.slice(0,3);
    renderPromotions("#home_promo_container", "#home_promo_template", side_promos);
    renderPromotions("#side_promo_container", "#side_promo_template", side_promos);
    
    var todays_hours = getTodaysHours();
    renderHomeHours("#home_hours_container", "#home_hours_template", todays_hours);
    renderHomeHours("#side_hours_container", "#side_hours_template", todays_hours);
    
    var prop_details = getPropertyDetails();
    renderSimple("#home_details_container", "#home_details_template", prop_details);
    renderSimple("#prop_details_container", "#prop_details_template", prop_details);
    
    var feature_items = getRepoDetailsByName("feauture items").images;
    // console.log(feature_items)
    
    // renderFeatureItems("#feature_item_container", "#feature_item_template", feature_items);
}