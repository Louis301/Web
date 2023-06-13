
// let tbody = document.getElementById('game_matrix');
// let cells_list = document.getElementsByTagName("td");
let game_cell_class = 'cell-default';

const GAME_MATRIX_SIZE = 4;
const game_matrix = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
const empty_cell = { x: 0, y: 0 };


// ----------------------------------------------------------------------------------------------------
// function init_game_matrix() 
// () => 
// {
    let i, j, k = 0;
    const cells_values = [];

    for (i = 0; i < GAME_MATRIX_SIZE ** 2; i++)
        cells_values[i] = i + 1;

    cells_values.sort(() => (Math.random() > .5) ? 1 : -1);

    for (i = 0; i < GAME_MATRIX_SIZE; i++) 
    {
        for (j = 0; j < GAME_MATRIX_SIZE; j++)
        {
            game_matrix[i][j] = cells_values[k++];
            
            if (game_matrix[i][j] === 16)  
            { 
                empty_cell.x = j; 
                empty_cell.y = i; 
            } 
        }
    }
// }

// ----------------------------------------------------------------------------------------------------
function game_matrix_to_html()
{
    let tbody = document.getElementById('game_matrix');

    let tr = "";
    tbody.innerHTML = "";

    for (let i = 0; i < GAME_MATRIX_SIZE; i++) 
    {
        tr += "<tr>";
        
        for (let j = 0; j < GAME_MATRIX_SIZE; j++)
        {
            if (j === empty_cell.x && i === empty_cell.y)
                tr = tr + `<td class="cell-empty" id="${i.toString()}${j.toString()}">${game_matrix[i][j]}</td>`;
            else
                tr = tr + `<td class="${game_cell_class}" id="${i.toString()}${j.toString()}">${game_matrix[i][j]}</td>`;
        }
        
        tr += "</tr>";
        tbody.innerHTML += tr;
        tr = "";
    }
}

//---------------------------------------------------------------------------------------------------
//
//  Получает координаты нажатой ячейки (в виде объекта) и меняет её местами с пустой ячейкой
//
function swap_cells(current_cell)
{  
    // Проверка возможности перемещения ячейки
    if((((empty_cell.x - current_cell.x)**2 + (empty_cell.y - current_cell.y)**2) **(1/2)) === 1)
    { 
        // Меняет местами пустую ячейку с текущей ячейкой
        game_matrix[empty_cell.y][empty_cell.x] = game_matrix[current_cell.y][current_cell.x];
        game_matrix[current_cell.y][current_cell.x] = 16;

        empty_cell.x = current_cell.x;
        empty_cell.y = current_cell.y;
    }
}

//----------------------------------------------------------------------------------------------------
function check_win()
{
    let k = 0;

    for(let i = 0; i < GAME_MATRIX_SIZE; i++)
        for(let j = 0; j < GAME_MATRIX_SIZE; j++)
            if (game_matrix[i][j] !== ++k)
                return;

    game_cell_class = 'cell-win';

    document.getElementById('text-win').innerHTML += '<h1>You win!</h1>';
    document.getElementById('text-win').innerHTML += '<a href="index.html">Play again</a>';
}

//----------------------------------------------------------------------------------------------------
function call_mouse_event(event)
{
    const current_cell = event.target;

    switch (event.type)
    {
        case "mouseover":
            current_cell.style.cursor = "pointer";
            break;

        case "click":
            swap_cells({ x: Number(current_cell.id[1]), y: Number(current_cell.id[0]) }); 
            check_win();
            game_matrix_to_html();

            if(game_cell_class !== 'cell-win')
                mouse_event_handler();
            
            break;
    }
}

//----------------------------------------------------------------------------------------------------
function mouse_event_handler()
{
    let cells_list = document.getElementsByTagName("td");

    for (const cell of cells_list)
    {
        let element = document.getElementById(cell.id);
        element.addEventListener("mouseover", call_mouse_event);
        element.addEventListener("click", call_mouse_event);
    }
}

// ================================================== Точка входа

game_matrix_to_html();

if(game_cell_class !== 'cell-win')
    mouse_event_handler();