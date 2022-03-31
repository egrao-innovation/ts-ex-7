export class InvalidInputError extends Error {
  constructor(message: string) {
    super()
    this.message = message || 'Invalid Input'
  }
}
// string literal type guard
type Direction = 'north' | 'east' | 'south' | 'west'
type Coordinates = [number, number]

export class Robot {
  robotDirection:Direction = 'north';
  robotCoordinates:Coordinates = [0, 0];
  array = ['north','east','south','west'];

  get bearing(): Direction {
    return this.robotDirection;
  }

  get coordinates(): Coordinates {
    return this.robotCoordinates;
  }

  place(position: { x: number; y: number; direction: string }) {
      if(!this.array.includes(position.direction, 0)){
        throw new InvalidInputError(position.direction);
      }
      this.robotDirection = position.direction as Direction;
      this.robotCoordinates = [position.x, position.y];
  }

  evaluate(instructions: string) {
    for (var i = 0; i < instructions.length; i++) {
      if(instructions.charAt(i) === 'R'){
        this.robotDirection = ((this.array.indexOf(this.robotDirection)+1) < this.array.length) ? this.array[this.array.indexOf(this.robotDirection)+1] as Direction : this.array[0] as Direction;
        ;
      }
      else if(instructions.charAt(i) === 'L'){
        this.robotDirection = ((this.array.indexOf(this.robotDirection)-1) >= 0) ? this.array[this.array.indexOf(this.robotDirection)-1] as Direction : this.array[this.array.length-1] as Direction;
      }
      else if(instructions.charAt(i) === 'A'){
        if(this.robotDirection === 'north'){
          this.robotCoordinates[1] += 1;
        }
        else if(this.robotDirection === 'south'){
          this.robotCoordinates[1] -= 1;
        }
        else if(this.robotDirection === 'east'){
          this.robotCoordinates[0] += 1;
        }
        else if(this.robotDirection === 'west'){
          this.robotCoordinates[0] -= 1;
        }
      }
    }
  }
}