//Для начала убедись, что структура карусели у тебя следующая:
// Есть внешний flex-контейнер и внутренние flex-элементы, которые мы будем прокручивать, например
/* 
<div class="universities-block-visible">
    <div class="university-card">...</div>
    <div class="university-card">...</div>
    </div>
</div>
*/

//Структура стилей должна быть следущей

//      .universities > .universities-block-visible{
//          display: flex;
//          width: width;
//          overflow: scroll;
//          scrollbar-width: none;
// }

//      .universities > .universities-block-visible::-webkit-scrollbar{
//          display: none;
// }

//     .universities > .universities-block-visible > .universities-block-full{
//         display: flex;
//         flex-direction: row;
//         width: max-content;
//         gap: 16px; gap - любой
//     }

// еще важно чтобы img и текст не выделялись, для этого пропишите свойства: user-select: none; pointer-events: none для соответсвующих элементов
// если всё соблюдено, можно смотреть ниже)


// В словари необходимо добавлять пары вида [ClassSelector видимого блока, 0]
$(document).ready(function() {
    let prev_coordsX_px = new Map();
    let carousel_shifts_percent = new Map();
    let initial_carousel_shifts_percent = new Map();
    let auto_scroll_enables = new Map();
    let auto_scroll_deltas = new Map();
    let resize_functions = new Array();

    function create_initial_data(block_name){
        prev_coordsX_px.set(block_name, 0);
        carousel_shifts_percent.set(block_name, 0);
        initial_carousel_shifts_percent.set(block_name, 0);
        auto_scroll_enables.set(block_name, false)
        auto_scroll_deltas.set(block_name, 1)
    }

// block_name - имя flex-контейнера
function move(e, block_name){
    // Ширина невидимого блока
    // let carousel_block_width = $(carousel_block_name).width();
    let carousel_block_width = $(block_name).prop('scrollWidth');
    // Ширина видимой прокручиваемой части
    let visible_piece_width = $(block_name).width();
    // Максимальный сдвиг
    let max_shift = carousel_block_width - visible_piece_width;

    // Текущая и предыдущая координата курсора
    let current_coordX_px = (e.clientX - $(block_name).position().left);
    let prev_coordX_px = prev_coordsX_px.get(block_name); 
    // При первом нажатии карусель сразу не сдвинется, а сдвинется только после смещения курсора
    if (prev_coordX_px == 0){
        prev_coordX_px = current_coordX_px;
    }
    
    // Для высчитывания сдвига в пикселях мы используем сдвиг в процентах от ширины блока умноженного на ширину блока в пикселях
    let carousel_shift_px = carousel_shifts_percent.get(block_name) * carousel_block_width;
    // Записываем начальный сдвиг
    let prev_carousel_shift_px = carousel_shift_px;
    // Считаем новый
    carousel_shift_px = carousel_shift_px + (current_coordX_px - prev_coordX_px);
    // Если сдвиг больше максимального, то мы его не увеличиваем, а отсавляем начальным 
    if (carousel_shift_px <= -max_shift - 50 || carousel_shift_px > 50){
        carousel_shift_px = prev_carousel_shift_px;
    }

    $(block_name).scrollLeft(-carousel_shift_px);

    carousel_shifts_percent.set(block_name, carousel_shift_px/carousel_block_width);
    prev_coordsX_px.set(block_name, current_coordX_px);

}

async function auto_scroll(block_name){
    let carousel_block_width = $(block_name).prop('scrollWidth');
    // Ширина видимой прокручиваемой части
    let visible_piece_width = $(block_name).width();
    // Максимальный сдвиг
    let max_shift = carousel_block_width - visible_piece_width;

    let carousel_shift_px = carousel_shifts_percent.get(block_name) * carousel_block_width;

    // Считаем новый
    carousel_shift_px = carousel_shift_px - auto_scroll_deltas.get(block_name);
    // Если сдвиг больше максимального, то мы его не увеличиваем, а отсавляем начальным 
    if (carousel_shift_px <= -max_shift -50 || carousel_shift_px > 50){
        auto_scroll_deltas.set(block_name, -auto_scroll_deltas.get(block_name))
    }
    $(block_name).scrollLeft(-carousel_shift_px);
    carousel_shifts_percent.set(block_name, carousel_shift_px/carousel_block_width);
    if (auto_scroll_enables.get(block_name)){
        return new Promise(resolve => {
            requestAnimationFrame(resolve);
        }).then(() => {auto_scroll(block_name)})
    }
    else{
        return Promise.resolve()
    }
}

async function events_for_carousel(block_name, onMouseMove_func=()=>{}, onClick_func=() => {}, offClick_func=() => {}, resize_func=() => {}, load_func=()=>{}, auto_scroll_enable=false){
    console.log('saopdija')
    create_initial_data(block_name);
    let carousel_block_width = $(block_name).prop('scrollWidth');
    let carousel_shift_percent = carousel_shifts_percent.get(block_name);
    let carousel_shift_px = carousel_shift_percent * carousel_block_width;
    $(block_name).scrollLeft(-carousel_shift_px);
    load_func();

    $(block_name).on('mousedown', function() {
        $(block_name).on('mousemove', (e) => {
          e.preventDefault()
          auto_scroll_enables.set(block_name, false)
          move(e, block_name);
          onMouseMove_func();
        });

        $(document).on('mousedown', () => {
            $(document).on('mousemove', (e) => {
                e.preventDefault()
                auto_scroll_enables.set(block_name, false)
                move(e, block_name);
                onMouseMove_func();
            })
        })

        $(document).on('mouseup', ()=>{
            console.log('aspodkpok')
            $(document).off('mousedown'); 
            $(document).off('mousemove');
            $(block_name).off('mousemove');

            prev_coordsX_px.set(block_name, 0);
            if (initial_carousel_shifts_percent.get(block_name) != carousel_shifts_percent.get(block_name)){
                console.log('pasodkpaoskoapsdk')
                $(block_name).off('click');
                offClick_func()
                initial_carousel_shifts_percent.set(block_name, carousel_shifts_percent.get(block_name));
            }
            else {
                console.log('else')
                onClick_func()
            }

            $(document).off('mouseup');
        })
    })

    resize_functions.push(resize_func)

    if (auto_scroll_enable && $(window).width() >= 768){
        auto_scroll_enables.set(block_name, auto_scroll_enable)
        await auto_scroll(block_name);
    }

}


// Необходимо вызвать функцию events_for_carousel c аргументами: имя блока, дополнительные функции для событий
    // events_for_carousel('.partnership-university-block-carousel');
    // events_for_carousel('.universities-block-visible', () => {}, () => {}, () => {}, () => {}, () => {}, auto_scroll_enable = true);
    // events_for_carousel('.region-sliders-visible-block', () => {onMouseMove_for_imgs(region)}, () => {onClick_for_imgs(region)}, () => {offClick_for_imgs(region)}, () => {draw_span_sliders(region)}, () => {draw_span_sliders(region)});
    // events_for_carousel('.university-gallerey-desktop-slider-visible-block', () => {onMouseMove_for_imgs(gallery_ygpu)}, () => {onClick_for_imgs(gallery_ygpu)}, () => {offClick_for_imgs(gallery_ygpu)}, () => {draw_span_sliders(gallery_ygpu)}, () => {draw_span_sliders(gallery_ygpu)});
    // events_for_carousel('.salary-cards');
    // events_for_carousel('.region-mobile-sliders');
    // events_for_carousel('.university-gallerey-mobile-slider');
    // events_for_carousel('.videos-carousel-slider', () => {onMouseMove_for_imgs(region)});

    events_for_carousel('.temp', () => {}, () => {}, () => {}, () => {}, () => {}, auto_scroll_enable = true);
    $(window).on('resize', () => {
        resize_functions.forEach((func) => {
            func()
        })
    })

});