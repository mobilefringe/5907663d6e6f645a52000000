function init() {
    $(".btn-nav").hover(function() {
        $(".dd_animated").css({"display": "block"});    
    });
    
    var promo_list = getPromotionsList();
    console.log(promo_list);
    renderPromotions("#side_promo_container", "#side_promo_template", promo_list);
}