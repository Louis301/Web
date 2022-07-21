
<?php

// class Colors
// {
//     static public $red = "red";
//     static public $green = "green";
//     static public $blue = "blue";
// }

$Colors = [
    'RED'=>'red', 
    'GREEN'=>'green',
    'BLUE'=>'blue',
    'black'=>'black'
];


class Matrix
{
    private $MAX_WIDTH = 10;
    private $MAX_HEIGHT = 10;
    private $matrix_values = array();


    public function init(): void 
    {
        for ($i = 0; $i < $this->MAX_HEIGHT; $i++)
        {
            for ($j = 0; $j < $this->MAX_WIDTH; $j++)
            {
                $this->matrix_values[$i][$j] = ($i === 0 or $i === $this->MAX_HEIGHT - 1 or 
                                    $j === 0 or $j === $this->MAX_WIDTH - 1) ? 4 : 0;  // 4 - frame, 0 - empty
            }
        }
    }

    public function print(): void 
    {
        for ($i = 0; $i < $this->MAX_HEIGHT; $i++)
        {
            for ($j = 0; $j < $this->MAX_WIDTH; $j++)
            {  
                $colorSimbol = $Colors['BLACK'];  // default

                switch($this->matrix_values[$i][$j])
                {
                    case 0: $colorSimbol = $Colors['RED']; break;
                    case 1: $colorSimbol = $Colors['GREEN']; break;
                    case 4: $colorSimbol = $Colors['BLUE']; break;
                }

                print "<font color={$colorSimbol}>{$this->matrix_values[$i][$j]}</font>"; 
            }
            echo '<br>';
        }
    }

    public function random_putting_ships(): void 
    {
        $QUANTITY_SHIPS = 10;

        for ($i = 0; $i < $QUANTITY_SHIPS; $i++)
        {
            $may_put = FALSE;

            while (!$may_put)
            {
                $x_ship = rand(1, $this->MAX_WIDTH - 2);
                $y_ship = rand(1, $this->MAX_HEIGHT - 2);

                if ($this->matrix_values[$y_ship][$x_ship] === 0) $may_put = TRUE;
            }

            $this->matrix_values[$y_ship][$x_ship] = 1;  // ship
        }
    }
}

# ============================ MAIN

error_reporting(-1);

$game_field = new Matrix();

$game_field->init();
$game_field->random_putting_ships();
$game_field->print();

echo "ddkks";