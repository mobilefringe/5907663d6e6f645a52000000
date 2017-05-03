function init() {
    function animate_dropdown(id){
        if ($("#"+id).is(":visible")){
            $("#"+id).slideUp();
        } else {
            if ($(".dd_animated").is(":visible")){
                $(".dd_animated").slideUp();
                $(".btn-nav").css({"background-color":"#da5840", "font-family":"verdana"});
               
                $("#btn-"+id).css({"background-color":"#a82911" ,"font-family":"verdana"});
                 $("#"+id).slideDown();
            } else {
                
                $("#btn-"+id).css({"background-color":"#a82911" ,"font-family":"verdana"});
                $("#"+id).slideDown(); 
            }
        }
    }

    var promo_list = getPromotionsList();
    var side_promos = promo_list.slice(0,3);
    renderPromotions("#side_promo_container", "#side_promo_template", side_promos);
    
    var todays_hours = getTodaysHours();
    console.log(todays_hours);
    renderHomeHours("#side_hours_container", "side_hours_template", todays_hours);
    
    var prop_details = getPropertyDetails();
    console.log(prop_details);
    renderSimple("#prop_details_container", "#prop_details_template", prop_details);
    
    var feature_items = getRepoDetailsByName("feauture items").images;
    console.log(feature_items)
    renderFeatureItems("#feature_item_container", "#feature_item_template", feature_items);
}