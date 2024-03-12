let text = new Map()
text.set("honest", "Честность рождает доверие друг к другу и является основой для сильного и сплоченного коллектива и нашего общего дела");
text.set("people", "Мы действительно стремимся сделать мир лучше. Сложно изменить весь мир, но в наших силах сделать идеальной жизнь внутри коллектива, начав с себя. А это значит: у нас интересная работа правильная заработная плата и бонусы хорошая атмосфера забота о здоровье и досуге");
text.set("technologie", "Мы всегда в тренде современных технологий. Этот третий замыкающий принцип, опираясь на первые два, делает нашу команду эффективной и успешной.");

let block_name = new Map();
block_name.set("first", "honest");
block_name.set("second", "people");
block_name.set("thri", "technologie");

let ids = new Map();
ids.set("current_id", "first");
ids.set("prev_id", "thri");
ids.set("next_id", "second");



let switch_tog = false;
let start_angle = -Math.PI/2;
// let delta = Math.PI/350;
let delta = Math.PI/300;
let end_angle = start_angle;



let canvas = create_canvas();
let context = create_context(canvas);

function create_canvas(){
    let canvas = document.createElement("canvas");
    canvas.id = "canvas";
    set_canvas_dimension(canvas);
    return canvas;
}

function create_context(canvas_obj){
    let context = canvas_obj.getContext('2d');
    set_context_dimension(canvas_obj, context);
    return context;
}

function set_canvas_dimension(canvas_obj){
    let div_root1 = document.getElementById("root");
    let div_root_width1 = div_root1.clientWidth;
    if (div_root_width1 > 600){
        canvas_obj.width = 20;
        canvas_obj.height = 20;
    }
    else{
        canvas_obj.width = 15;
        canvas_obj.height = 15;
    }
}

function set_context_dimension(canvas, context){
    if (canvas.width == 20){
        context.lineWidth = 5;
    }
    else{
        context.lineWidth = 3;
    }
}



let global_current_id= '';
let grid_element = document.getElementsByClassName("content3_right")[0];

function larger_text_key(){
    let larger_text = '';
    let key_larger_text = '';
    text.forEach((value, key) => {
        if (value.length > larger_text.length){
            larger_text = value;
            key_larger_text = key;   
        }
        })
    return key_larger_text;
}



principle_block_resizing(canvas);

function principle_block_resizing(canvas){
    set_canvas_dimension(canvas);
    set_context_dimension(canvas, context);
    grid_element.style = "height: auto;" ;
    let key_larger_text = larger_text_key();
    change_text_content(key_larger_text);
    grid_element_height = grid_element.scrollHeight;
    if (global_current_id) {
        change_text_content(global_current_id);
    }
    else{
        change_text_content("honest");
    }
    grid_element.style = "height: " + grid_element_height + "px;";
}




function change_text_content(name){
    document.getElementById("text_principle").textContent = text.get(name);
}

function delete_canv(block_id){
    block = document.getElementById(block_id);
    block.removeChild(canvas);
    document.getElementById(block_name.get(block_id)).className = "prev_col";
}


function create_canv(block_id){
    block = document.getElementById(block_id);
    block.appendChild(canvas);
}


function change_block(current_id, prev_id=''){
    global_current_id = block_name.get(current_id);
    change_text_content(global_current_id);
    try{
        delete_canv(prev_id);
        document.getElementById(block_name.get(prev_id)).className = "prev_col";
        // document.getElementById(block_name.get(prev_id)).classList.add("prev_col");
    }
    catch (err)
    {}
    document.getElementById(block_name.get(current_id)).className = "current_col";
    // document.getElementById(block_name.get(current_id)).classList.add("current_col");
    create_canv(current_id);
}


async function draw_arc(){
    end_angle += delta;
    context.beginPath();
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (end_angle < 3*Math.PI/2 && !switch_tog){
    context.arc(canvas.width/2, canvas.height/2, canvas.width/2 - 3, start_angle, end_angle, false);
    context.stroke();
    context.strokeStyle='white';
    return new Promise(resolve => {
        requestAnimationFrame(resolve);
        // setTimeout(() => {resolve()}, 100)
    }).then(draw_arc);
    }
    else {
        end_angle = -Math.PI/2;
        return Promise.resolve();
    }
}

function toogle(current_id, prev_id, next_id){
    switch_tog = true;
    ids.set("current_id", current_id);
    ids.set("next_id", next_id);
    ids.set("prev_id", prev_id);
}


async function f(){
    while (true){
        prev_id = ids.get("current_id");
        await draw_arc();
        if (switch_tog){
            switch_tog = false;
            delete_canv(prev_id);
        }
        else {
            current_id = ids.get("current_id");
            prev_id = ids.get("prev_id");
            next_id = ids.get("next_id");
            ids.set("current_id", next_id);
            ids.set("next_id", prev_id);
            ids.set("prev_id", current_id);
        }
        change_block(ids.get("current_id"), ids.get("prev_id"));
}
}


change_block(ids.get("current_id"), ids.get("prev_id"));
f('first', 'thri', 'second');