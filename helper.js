function init() {
    $(".btn-nav").hover(function() {
        $(".dd_animated").css({"display": "block"});    
    });
    
    var promo_list = getPromotionsList();
    console.log(promo_list);
    var side_promos = promo_list.slice(0,3);
    renderPromotions("#side_promo_container", "#side_promo_template", side_promos);
}