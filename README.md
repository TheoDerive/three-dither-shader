
# Three Dither Shader

Personally, I find the game [Return of the Obra Dinn](https://store.steampowered.com/app/653530/Return_of_the_Obra_Dinn/?l=english) absolutely beautiful — whether it's the 1-bit color palette or, especially, the incredibly well-done dithering effect.

That's why, for my portfolio, I wanted to give a little tribute to this exceptional game by recreating a dithering effect as the main visual element.

This is the first shader I've ever written, and also the first package I've published on npm. So if you run into any bugs or issues, feel free to open an issue so I can fix it!

---

## 🛠️ Installation

To use **Three Dither Shader** in a Three.js project, install it with:

```bash
npm install three-dither-shader

```

or

```bash
yarn add three-dither-shader
```

---

## ⚙️ Usage

Create an instance of **DitherMaterial**

```js
import { DitherMaterial } from "three-dither-shader"

const dither = new DitherMaterial()
```

### Get the material
```js
const material = dither.getMaterial(1, 1)
```
The parameters correspond to your mesh’s dimensions, which helps the shader handle UV deformation correctly.

### Apply it to a mesh

```js
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  material
)```

---

### 💡 Light management

⚠️ If your scene looks black or empty — don’t worry! This is normal. Lighting is handled inside the shader, not via Three.js lights.

To add a light source:

```js
import { LightManager } from "three-dither-shader"

LightManager.addLight([0, 1, 1], 1)
```

---

### 🧪 Adjusting global pixelRatio

If the render looks too small or low-res, you can tweak the global pixelRatio:

```js
LightManager.setPixelRatio(150)
```

---

### 🎛️ Customizing uniforms

Each DitherMaterial exposes its own set of uniforms, so you can customize things manually if needed:

```js
uniforms: {
    pixelRatio: { value: LightManager.getPixelRatio() },
    decayIntencity: { value: this.decay },
    meshDimention: { value: new THREE.Vector2(1, 1) }
},
```


## Support

For support, email theo.derive.pro@gmail.com or join our Slack channel.

