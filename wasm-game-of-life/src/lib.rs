mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

use observable_react::ReactObservable;
use observable_rs::Observable;

#[wasm_bindgen(start)]
pub fn start() {
    log::set_logger(&wasm_bindgen_console_logger::DEFAULT_LOGGER).unwrap();
    log::set_max_level(log::LevelFilter::Info);
    crate::utils::set_panic_hook();
}

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Dead = 0,
    Alive = 1,
}

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: Vec<Cell>,
}

impl Universe {
    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }

    fn count_live_neightbors(&self, row: u32, column: u32) -> u8 {
        let mut counter = 0;

        for delta_row in [self.height - 1, 0, 1].iter().cloned() {
            for delta_col in [self.width - 1, 0, 1].iter().cloned() {
                if delta_row == 0 && delta_col == 0 {
                    continue;
                }

                let neighbor_row = (row + delta_row) % self.height;
                let neighbor_col = (column + delta_col) % self.width;
                let idx = self.get_index(neighbor_row, neighbor_col);

                counter += self.cells[idx] as u8;
            }
        }

        counter
    }
}

// #[allow(unused)]
// #[wasm_bindgen]
// pub fn create_game_of_life() -> GameOfLife {
//     GameOfLife::default()
// }

// #[wasm_bindgen]
// #[derive(Clone, Default)]
// pub struct GameOfLife {
//     // things: usize,
//     field: Observable<Vec<String>>,
// }

// #[wasm_bindgen]
// impl GameOfLife {
//     pub fn do_something(&mut self) {
//         self.things += 1;
//         self.list.push(format!("Thing {}", self.things));
//     }
//     pub fn get_the_list(&self) -> ReactObservable {
//         self.list.clone().into()
//     }
// }
