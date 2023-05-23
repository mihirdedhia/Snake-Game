const GRID_SIZE = 21;

export function randomGridPosition() { 
    return {
        // x: Math.floor(Math.random() * (GRID_SIZE)) + 1 => generates numbers from 0 to 20 so add 1 to get 1 to 21
        x: Math.floor(Math.random() * (GRID_SIZE - 2)) + 2, // => generates numbers from 0 to 18 so add 2 to get 2 to 20
        y: Math.floor(Math.random() * (GRID_SIZE - 2)) + 2
    }
}

export function outSideGrid(position){
    return (
        position.x < 1 || position.x > GRID_SIZE || 
        position.y < 1 || position.y > GRID_SIZE
    )
}