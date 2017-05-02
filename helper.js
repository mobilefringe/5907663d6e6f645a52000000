function init() {
    $(".btn-nav").hover(function() {
        $(".dd_animated").css({"display": "block"});    
    });
    
    var promo_list = getPromotionsList();
    var side_promos = promo_list.slice(0,3);
    renderPromotions("#side_promo_container", "#side_promo_template", side_promos);
    
    var todays_hours = getTodaysHours();
    console.log(todays_hours);
    renderHomeHours("#side_hours_container", "side_hours_template", todays_hours);
    
    var prop_details = getPropertyDetails();
    console.log(prop_details);
    renderGeneral("#prop_details_container", "#prop_details_template", prop_details);
    
}