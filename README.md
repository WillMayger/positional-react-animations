# Positional React Animations - Simple hand crafted cursor animations.

#### A very easy package to create cool cursor based animations for react.

[Demo of animation](https://atomizedobjects.com/custom/tutorials/demo/positional-react-animation/)

[Click here to see full blog post about animation (https://atomizedobjects.com/blog/react/tutorial-creating-reactjs-animations-react-hooks/)](https://atomizedobjects.com/blog/react/tutorial-creating-reactjs-animations-react-hooks/)

## Contents.
 - Guide
 - API / Props

## Guide - You can use Positional React Animations very easily and quickly.

### Step 1.
Install and Import SimpleDnD into your component.
```
npm install positional-react-animations --save
```

### Step 2.
Add in the components like so:
```
...
import Positional, { Coord, Img } from 'positional-react-animations';

export default function YourComponent() {
  return (
    <Positional height="100vh" cursorEvent>
      <Coord>
        <span>TEST</span>
      </Coord>
      <Coord x={20} y={70}>
        <span>TEST</span>
      </Coord>
      <Coord x={60} y={40}>
        <span>TEST</span>
      </Coord>
    </Positional>
  );
}
```

### Step 3 (Optional).
Use the pre-packaged `<Img />` component to make use of the animation with images.
```
...
import Positional, { Coord, Img } from 'positional-react-animations';

export default function YourComponent() {
  return (
    <Positional cursorEvent height="100vh">
      <Coord>
        <Img src={myImage} width={500}>
      </Coord>
      <Coord x={20} y={70}>
        <Img src={myOtherImage} width={380}>
      </Coord>
      <Coord x={60} y={40}>
        <Img src={myLastImage} width={1000}>
      </Coord>
    </Positional>
  );
}
```
The width prop is more of a `max-width` in this situation.

## API / Props

### `Positional`
The parent / container component.

Props:
 - fullWidth
 - height
 - cursorEvent

#### fullWidth
This is a prop of type bool, it will tell the positional element that you want it to span the full screen.
This must be used in combination with the fullWidth prop within the Coord and Img components.

#### height
This is a prop of type string, it allows any css value followed by a unit. for example:
```
  height="100vh"
```

#### cursorEvent
This is a prop of type bool, that will enable or disable the cursor based animation.
It is defaulted to false, so this must be defined to make use of the animation.
For example:
```
<Positional
  cursorEvent
>
  ...
</Positional>
```

### `Coord`
The child elements that sit inside the `Positional` component.

Props:
 - x
 - y
 - fullWidth
 - medias,
 - shadow,
 - intense,

 #### x, y
 The x / y props are used to plot the position of the component.
 They are of type number.
 Think of x as the percentage from the left and y the percentage from the top.
 The default is 50 for both which will center the component.

 #### fullWidth
This is a prop of type bool, it will tell the coord element that you want it to span the full screen.
This must be used in combination with the fullWidth prop within the Positional and Img components.

 #### medias
  Media queries for the coordinates.
  For example:
  ```
  <Coord
    medias={[
      { query: 768, x: 40, y: 40 },
      { query: 1200, x: 60, y: 60 },
    ]}
  />
  ```

#### shadow
This is a prop of type bool, defining this prop will create a shadow effect on the contents of the coord component that will move at a different speed.

#### intense
This is a prop of type bool, Adds more depth to the shadows on the coord.


### `Img`
A component to enable the use of images.

Props:
  - src
  - height
  - width
  - fullWidth

#### src
Accepts any form of image for the source.

#### height
This is a prop of type number, sets the max height

#### width
This is a prop of type number, sets the max width

#### fullWidth
This is a prop of type bool, it will tell the coord element that you want it to span the full screen.
This must be used in combination with the fullWidth prop within the Coord and Positional components.
