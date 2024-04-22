$(function() {

    var header = $("#header"),
        introH = $("#intro").innerHeight(),
        scrollOffset = $(window).scrollTop();

    /* Header fixed */
        checkScroll(scrollOffset);

    $(window).on("scroll", function(){
        scrollOffset = $(this).scrollTop();
        checkScroll(scrollOffset);
    });

    function checkScroll(scrollOffset) {

        if(scrollOffset >= introH) {
            header.addClass("fixed");
        }
        else{
            header.removeClass("fixed");
        }
}

    /*Smooth scroll */
    $("[data-scroll]").on("click", function(event) {
        event.preventDefault();

        var blockId = $(this).data('scroll'),
            blockOffset = $(blockId).offset().top;

        $("html, body").animate({
          scrollTop: blockOffset
        }, 500  );
    });


    app.post('/cards', async (req, res) => {
    try {
        const { cardNumber, cardHolderName, expirationDate, cvv } = req.body;

        const newCard = new Card({
            cardNumber,
            cardHolderName,
            expirationDate,
            cvv,
        });

        await newCard.save();

        res.status(201).json({ message: 'Данные карты успешно сохранены.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});


});
