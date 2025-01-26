# PROMPT 0da8555e-37f2-4f31-a08a-7b7f83252c06


I want the image to be the first entry in the flex when screen is phone size but on the right whenever it's not screen size.

          <section className="bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row gap-8 items-center">
            {/* Profile Image */}
            <div className="lg:w-1/3 md:hidden">
              <img
                src="images/marisela.jpeg"
                alt={t("about.marisela.name")}
                className="rounded-lg shadow-lg"
              />
            </div>
            {/* Profile Details */}
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold text-primary">
                {t("about.yeselia.name")}
              </h2>
              <h3 className="mt-2 text-xl font-semibold text-lt-primary">
                {t("about.yeselia.title")}
              </h3>
              <p className="mt-4 text-lt-primary whitespace-pre-wrap">
                {t("about.yeselia.description")}
              </p>
            </div>
            {/* Profile Image */}
            <div className="lg:w-1/3 md:visible">
              <img
                src="images/marisela.jpeg"
                alt={t("about.marisela.name")}
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

# OUTPUT 0da8555e-37f2-4f31-a08a-7b7f83252c06
To achieve your goal—where the image is the first element in the flex layout on smaller screen sizes (phone size) and moves to the right on larger screen sizes (desktop and beyond)—you can use the `order` property provided by Tailwind CSS. This property allows you to change the order of flex items dynamically based on the screen size.

Here's an updated version of your code to meet your requirements:

```jsx
<section className="bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row gap-8 items-center">
  {/* Profile Image */}
  <div className="lg:w-1/3 order-1 lg:order-2">
    <img
      src="images/marisela.jpeg"
      alt={t("about.marisela.name")}
      className="rounded-lg shadow-lg"
    />
  </div>

  {/* Profile Details */}
  <div className="lg:w-2/3 order-2 lg:order-1">
    <h2 className="text-3xl font-bold text-primary">
      {t("about.yeselia.name")}
    </h2>
    <h3 className="mt-2 text-xl font-semibold text-lt-primary">
      {t("about.yeselia.title")}
    </h3>
    <p className="mt-4 text-lt-primary whitespace-pre-wrap">
      {t("about.yeselia.description")}
    </p>
  </div>
</section>
```

### Explanation of Changes
1. **`order` Classes**:
   - Added `order-1` to the image container (`<div>` that wraps the image).
   - Added `order-2` to the text container (`<div>` that wraps the profile details).
   - Added `lg:order-2` to the image container and `lg:order-1` to the text container. This swaps their placement on larger screens.

   When the screen is in phone size (default), the image container comes first (`order-1`), and the text container comes second (`order-2`). On larger screens (`lg` and beyond), their positions are reversed using `lg:order-2` and `lg:order-1`.

2. **Removed Duplicate Div for the Image**:
   - Your previous code unnecessarily had two `<div>` elements for the image, each with different visibility settings for responsive screens (`md:hidden` and `md:visible`). This is not needed since the `order` class handles the layout dynamically.

3. **Simplified Layout**:
   - The entire section uses a single flex container for both the image and the details, eliminating the need for duplicate elements.

### Result
- On small screens (phone size), the image will display first (on top if stacked vertically).
- On larger screens (`lg` and up), the image will move to the right side of the content.

This approach minimizes the amount of code, improves maintainability, and leverages Tailwind CSS's utility classes effectively.
# PROMPT 7b10e8eb-ec07-4830-876d-d970cd84af42


I want you to keep the gap of 16 when big but have the buttons one bellow the other if on phone mode

        <div className="mt-8 flex justify-center md:gap-16 gap-4">
          <Link className="border rounded border-white mt-6 px-6 py-2 w-1/2 lg:w-1/3 bg-transparent hover:bg-pink-50 hover:text-primary text-white transition text-button" to="/contact" onClick={() => window.scrollTo(0, 0)}>
            <button className="uppercase">
                {t("callToAction.contactUsButton")}
            </button>
          </Link>
          <Link className="border rounded border-white mt-6 px-6 py-2 w-1/2 lg:w-1/3 bg-transparent hover:bg-pink-50 hover:text-primary text-white transition text-button" to="/about" onClick={() => window.scrollTo(0, 0)}>
            <button className="uppercase">
                {t("callToAction.learnMoreButton")}
            </button>
          </Link>
        </div>

# OUTPUT 7b10e8eb-ec07-4830-876d-d970cd84af42
To make the buttons stack vertically when on smaller screens (phone mode), you can use Tailwind CSS's responsive `flex-col` and `flex-row` classes to toggle between vertical and horizontal layouts at different screen sizes. Additionally, maintaining the gap of 16 between the elements on larger screens while having smaller gaps on phone mode can also be achieved using responsive `gap` classes.

Here’s how you can achieve your requirements:

```jsx
<div className="mt-8 flex flex-col md:flex-row justify-center md:gap-16 gap-4">
  <Link
    className="border rounded border-white mt-6 px-6 py-2 w-full md:w-1/3 bg-transparent hover:bg-pink-50 hover:text-primary text-white transition text-button"
    to="/contact"
    onClick={() => window.scrollTo(0, 0)}
  >
    <button className="uppercase">
      {t("callToAction.contactUsButton")}
    </button>
  </Link>
  <Link
    className="border rounded border-white mt-6 px-6 py-2 w-full md:w-1/3 bg-transparent hover:bg-pink-50 hover:text-primary text-white transition text-button"
    to="/about"
    onClick={() => window.scrollTo(0, 0)}
  >
    <button className="uppercase">
      {t("callToAction.learnMoreButton")}
    </button>
  </Link>
</div>
```

### Explanation of Changes
1. **Responsive Flexbox Layout (`flex-col` and `flex-row`)**:
   - `flex-col`: By default (on small screens), the flexbox layout will stack its children vertically.
   - `md:flex-row`: Starting from medium-sized screens (`md` and above), the layout will switch to horizontal alignment.

2. **Responsive Gap (`gap-4` and `md:gap-16`)**:
   - `gap-4`: On smaller screens, the vertical spacing between the stacked buttons will be 4 (a modest gap).
   - `md:gap-16`: On medium screens and above, the horizontal spacing between the buttons will increase to 16 for a nice separation.

3. **Responsive Width Adjustment (`w-full` and `md:w-1/3`)**:
   - `w-full`: On smaller screens, each button will take up the full width, making them look good when stacked vertically.
   - `md:w-1/3`: On medium and larger screens, the buttons will take up one-third of the container width, giving them proper proportions in the horizontal layout.

4. **Removed Redundant Styles on `<button>`**:
   - You don’t need to put most of the styles into the `<button>` because the parent `<Link>` element already carries most of the styling. The `<button>` element only keeps the `uppercase` text transformation.

### Resulting Behavior
- **On small screens (phone mode)**: Buttons will stack vertically (`flex-col`) with a gap of 4 and will occupy the full width of the container.
- **On medium and larger screens**: Buttons will align horizontally (`flex-row`) with a gap of 16 and will occupy one-third of the container width.

This approach ensures a clean and responsive design with Tailwind CSS, adhering to your requirements.

# ASK MODEL BELLOW