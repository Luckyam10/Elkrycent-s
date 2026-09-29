/* =========================================================
   OUR DAYS — FAMILY JOURNAL
   Complete JavaScript
========================================================= */


/* =========================================================
   HELPER
========================================================= */

const $ = (selector) => document.querySelector(selector);


/* =========================================================
   LOGIN
========================================================= */

const loginScreen = $("#loginScreen");
const app = $("#app");
const loginForm = $("#loginForm");
const loginError = $("#loginError");

const FAMILY_NAME = "family";
const PASSWORD = "memories";


if (loginForm) {

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const username =
            $("#username").value.trim().toLowerCase();

        const password =
            $("#password").value;

        if (
            username === FAMILY_NAME &&
            password === PASSWORD
        ) {

            sessionStorage.setItem(
                "familyLoggedIn",
                "true"
            );

            loginScreen.style.display = "none";

            app.style.display = "block";

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

        } else {

            loginError.textContent =
                "That doesn't seem to be the family passcode.";

            loginError.classList.add("shake");

            setTimeout(() => {

                loginError.classList.remove("shake");

            }, 500);

        }

    });

}


/* =========================================================
   SESSION CHECK
========================================================= */

if (
    sessionStorage.getItem("familyLoggedIn") === "true"
) {

    if (loginScreen) {
        loginScreen.style.display = "none";
    }

    if (app) {
        app.style.display = "block";
    }

}


/* =========================================================
   MOBILE MENU
========================================================= */

const menu = $("#menu");
const mobileMenu = $("#mobileMenu");


if (menu && mobileMenu) {

    menu.addEventListener("click", () => {

        mobileMenu.classList.toggle("open");

        const isOpen =
            mobileMenu.classList.contains("open");

        menu.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menu.setAttribute(
            "aria-label",
            isOpen
                ? "Close menu"
                : "Open menu"
        );

    });


    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "open"
                    );

                    menu.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menu.setAttribute(
                        "aria-label",
                        "Open menu"
                    );

                }
            );

        });

}


/* =========================================================
   IMAGE / VIDEO CONFIGURATION
========================================================= */

const IMAGE_ROOT =
    "assets/images/";

const VIDEO_ROOT =
    "assets/videos/";


/* =========================================================
   IMAGE FILENAMES
========================================================= */

/*
    Supports:

    Capture.jpg
    Capture1.jpg
    Capture2.jpg
    Capture3.jpg

    Capture-1.jpg
    Capture-2.jpg
    Capture-3.jpg

    plus several common naming formats.
*/

const IMAGE_NAMES = [];


/* Main Capture.jpg */

IMAGE_NAMES.push(
    "Capture.jpg"
);


/* Capture1.jpg ... Capture50.jpg */

for (
    let i = 1;
    i <= 50;
    i++
) {

    IMAGE_NAMES.push(
        `Capture${i}.jpg`
    );

}


/* Capture-1.jpg ... Capture-50.jpg */

for (
    let i = 1;
    i <= 50;
    i++
) {

    IMAGE_NAMES.push(
        `Capture-${i}.jpg`
    );

}


/* =========================================================
   ADDITIONAL COMMON FILENAMES
========================================================= */

const EXTRA_IMAGE_NAMES = [

    "photo.jpg",
    "photo-1.jpg",
    "photo-2.jpg",
    "photo-3.jpg",
    "photo-4.jpg",
    "photo-5.jpg",

    "image.jpg",
    "image-1.jpg",
    "image-2.jpg",
    "image-3.jpg",
    "image-4.jpg",
    "image-5.jpg",

    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",

    "IMG_0001.jpg",
    "IMG_0002.jpg",
    "IMG_0003.jpg",
    "IMG_0004.jpg",
    "IMG_0005.jpg",

    "IMG_001.jpg",
    "IMG_002.jpg",
    "IMG_003.jpg",
    "IMG_004.jpg",
    "IMG_005.jpg"

];


EXTRA_IMAGE_NAMES.forEach(name => {

    if (!IMAGE_NAMES.includes(name)) {

        IMAGE_NAMES.push(name);

    }

});


/* =========================================================
   VIDEO FILENAMES
========================================================= */

const VIDEO_NAMES = [];

for (
    let i = 1;
    i <= 30;
    i++
) {

    VIDEO_NAMES.push(
        `Capture-${i}.mp4`
    );

    VIDEO_NAMES.push(
        `Capture${i}.mp4`
    );

    VIDEO_NAMES.push(
        `video-${i}.mp4`
    );

    VIDEO_NAMES.push(
        `${i}.mp4`
    );

    VIDEO_NAMES.push(
        `IMG_${String(i).padStart(4, "0")}.mp4`
    );

}

VIDEO_NAMES.unshift(
    "Capture.mp4",
    "video.mp4",
    "movie.mp4"
);


/* =========================================================
   CHECK IMAGE EXISTS
========================================================= */

function checkImage(src) {

    return new Promise(resolve => {

        const img =
            new Image();

        img.onload = () => {
            resolve(true);
        };

        img.onerror = () => {
            resolve(false);
        };

        img.src = src;

    });

}


/* =========================================================
   FIND AVAILABLE IMAGES
========================================================= */

async function findImages(folder) {

    const found = [];

    /*
        Set prevents duplicate paths if
        filenames overlap.
    */

    const checked =
        new Set();

    for (
        const filename of IMAGE_NAMES
    ) {

        const src =
            `${IMAGE_ROOT}${folder}/${filename}`;

        if (checked.has(src)) {
            continue;
        }

        checked.add(src);

        const exists =
            await checkImage(src);

        if (exists) {

            found.push(src);

        }

    }

    return found;

}


/* =========================================================
   FIND FIRST IMAGE
========================================================= */

async function findFirstImage(folder) {

    const images =
        await findImages(folder);

    return images.length
        ? images[0]
        : null;

}


/* =========================================================
   IMAGE FALLBACK
========================================================= */

function imageFallback(
    element,
    folder,
    title = "Photo"
) {

    element.onerror = function () {

        this.style.display =
            "none";

        const fallback =
            document.createElement("div");

        fallback.className =
            "image-error-placeholder";

        fallback.innerHTML = `

            <div>

                <strong>
                    ${title}
                </strong>

                <br>

                <span>
                    Add a photo to
                    assets/images/${folder}/
                </span>

            </div>

        `;

        this.parentElement.appendChild(
            fallback
        );

    };

}


/* =========================================================
   FAMILY DATA
========================================================= */

const familyMembers = [

    {
        id: "lucky",

        name: "Lucky",

        role: "One of us",

        folder: "lucky",

        description:
            "A little corner for Lucky's photos, videos and memories.",

        icon: "☀"
    },

    {
        id: "millicent",

        name: "Millicent",

        role: "One of us",

        folder: "millicent",

        description:
            "A little corner for Millicent's memories.",

        icon: "✿"
    },

    {
        id: "kc",

        name: "KC",

        role: "One of us",

        folder: "kc",

        description:
            "A little corner for KC's memories.",

        icon: "✦"
    },

    {
        id: "mama",

        name: "Emelyn",

        role: "Mama",

        folder: "mama",

        description:
            "The heart of the home.",

        icon: "♡"
    },

    {
        id: "ally",

        name: "Ally",

        role: "One of us",

        folder: "ally",

        description:
            "A little corner for Ally's memories.",

        icon: "☼"
    },

    {
        id: "real-teng",

        name: "Real Teng",

        role: "One of us",

        folder: "real-teng",

        description:
            "A little corner for Real Teng's memories.",

        icon: "✧"
    }

];


/* =========================================================
   FAMILY CARDS
========================================================= */

async function createFamilyCards() {

    const grid =
        $("#familyGrid");

    if (!grid) return;

    grid.innerHTML = "";


    for (
        let index = 0;
        index < familyMembers.length;
        index++
    ) {

        const person =
            familyMembers[index];


        const card =
            document.createElement("button");

        card.className =
            "person-card";

        card.type =
            "button";

        card.style.setProperty(
            "--delay",
            `${index * 80}ms`
        );

        card.addEventListener(
            "click",
            () => openPerson(person.id)
        );


        /* IMAGE */

        const imageBox =
            document.createElement("div");

        imageBox.className =
            "person-image";


        const image =
            await findFirstImage(
                person.folder
            );


        if (image) {

            const img =
                document.createElement("img");

            img.src =
                image;

            img.alt =
                `${person.name} family photo`;

            img.loading =
                "lazy";

            imageFallback(
                img,
                person.folder,
                person.name
            );

            imageBox.appendChild(
                img
            );

        } else {

            imageBox.innerHTML = `

                <div class="image-error-placeholder">

                    <div>

                        <strong>
                            ${person.name}
                        </strong>

                        <br>

                        <span>
                            Add photos to<br>
                            assets/images/${person.folder}/
                        </span>

                    </div>

                </div>

            `;

        }


        /* INFO */

        const info =
            document.createElement("div");

        info.className =
            "person-info";

        info.innerHTML = `

            <small class="person-role">
                ${person.role}
            </small>

            <h3>
                ${person.name}
            </h3>

            <p>
                ${person.description}
            </p>

            <strong>
                Open their corner ↗
            </strong>

        `;


        card.appendChild(
            imageBox
        );

        card.appendChild(
            info
        );

        grid.appendChild(
            card
        );

    }

}


createFamilyCards();


/* =========================================================
   DOGS
========================================================= */

const dogs = [

    {
        id: "botchok",
        name: "Botchok",
        folder: "botchok",
        icon: "🐾"
    },

    {
        id: "bulingit",
        name: "Bulingit",
        folder: "bulingit",
        icon: "🐶"
    },

    {
        id: "trixie",
        name: "Trixie",
        folder: "trixie",
        icon: "♡"
    }

];


/* =========================================================
   DOG CARDS
========================================================= */

async function createDogCards() {

    const grid =
        $("#dogsGrid");

    if (!grid) return;

    grid.innerHTML = "";


    for (
        let index = 0;
        index < dogs.length;
        index++
    ) {

        const dog =
            dogs[index];


        const card =
            document.createElement("button");

        card.className =
            "person-card dog-card";

        card.type =
            "button";

        card.style.setProperty(
            "--delay",
            `${index * 100}ms`
        );

        card.addEventListener(
            "click",
            () => openDog(dog.id)
        );


        const imageBox =
            document.createElement("div");

        imageBox.className =
            "person-image";


        const image =
            await findFirstImage(
                dog.folder
            );


        if (image) {

            const img =
                document.createElement("img");

            img.src =
                image;

            img.alt =
                `${dog.name} photo`;

            img.loading =
                "lazy";

            imageFallback(
                img,
                dog.folder,
                dog.name
            );

            imageBox.appendChild(
                img
            );

        } else {

            imageBox.innerHTML = `

                <div class="image-error-placeholder">

                    <div>

                        <strong>
                            ${dog.icon}
                            ${dog.name}
                        </strong>

                        <br>

                        <span>
                            Add photos to<br>
                            assets/images/${dog.folder}/
                        </span>

                    </div>

                </div>

            `;

        }


        const info =
            document.createElement("div");

        info.className =
            "person-info";

        info.innerHTML = `

            <small class="person-role">
                OUR DOG
            </small>

            <h3>
                ${dog.name}
            </h3>

            <p>
                A collection of little paws,
                chaos, cuddles and memories.
            </p>

            <strong>
                Open their corner ↗
            </strong>

        `;


        card.appendChild(
            imageBox
        );

        card.appendChild(
            info
        );

        grid.appendChild(
            card
        );

    }

}


createDogCards();


/* =========================================================
   PLACES
========================================================= */

const places = [

    {
        id: "tagaytay",

        name: "Tagaytay",

        folder: "tagaytay",

        icon: "🌄",

        description:
            "Cool air, long drives, food, views and days spent together."
    },

    {
        id: "beach",

        name: "The Beach",

        folder: "beach",

        icon: "🌊",

        description:
            "Sun, water, sand and the memories that came with them."
    },

    {
        id: "manila",

        name: "Manila",

        folder: "manila",

        icon: "🏙",

        description:
            "City days, errands that became adventures and places we discovered."
    }

];


/* =========================================================
   PLACE IMAGE PATH
========================================================= */

async function findPlaceImages(folder) {

    return await findImages(
        `places/${folder}`
    );

}


/* =========================================================
   PLACE CARDS
========================================================= */

async function createPlaces() {

    const grid =
        $("#placesGrid");

    if (!grid) return;

    grid.innerHTML = "";


    for (
        let index = 0;
        index < places.length;
        index++
    ) {

        const place =
            places[index];


        const card =
            document.createElement("button");

        card.className =
            "place-card";

        card.type =
            "button";

        card.style.setProperty(
            "--delay",
            `${index * 100}ms`
        );

        card.addEventListener(
            "click",
            () => openPlace(place.id)
        );


        const art =
            document.createElement("div");

        art.className =
            "place-art";


        const images =
            await findPlaceImages(
                place.folder
            );


        if (images.length) {

            const img =
                document.createElement("img");

            img.src =
                images[0];

            img.alt =
                `${place.name} family memory`;

            img.loading =
                "lazy";

            art.appendChild(
                img
            );

        } else {

            art.innerHTML = `

                <div class="image-error-placeholder">

                    <div>

                        <strong>
                            ${place.icon}
                            ${place.name}
                        </strong>

                        <br>

                        <span>
                            Add photos to<br>
                            assets/images/places/${place.folder}/
                        </span>

                    </div>

                </div>

            `;

        }


        const info =
            document.createElement("div");

        info.className =
            "place-info";

        info.innerHTML = `

            <small>
                CHAPTER
                ${String(index + 1).padStart(2, "0")}
            </small>

            <h3>
                ${place.name}
            </h3>

            <p>
                ${place.description}
            </p>

            <strong>
                Open chapter ↗
            </strong>

        `;


        card.appendChild(
            art
        );

        card.appendChild(
            info
        );

        grid.appendChild(
            card
        );

    }

}


createPlaces();


/* =========================================================
   TIMELINE
========================================================= */

const timeline = [

    {
        year: "THEN",

        title: "Where it all began",

        text:
            "The early days. The old photos. The people we were before we knew how quickly everything would change."
    },

    {
        year: "GROWING",

        title: "Growing together",

        text:
            "School days, family gatherings, birthdays, random afternoons and all the little things between them."
    },

    {
        year: "ADVENTURES",

        title: "Going places",

        text:
            "Road trips, Tagaytay days, beach trips, city adventures and places that became part of our story."
    },

    {
        year: "NOW",

        title: "The life we're living",

        text:
            "The photos we haven't taken yet. The places we haven't visited. The memories still waiting to happen."
    }

];


function createTimeline() {

    const container =
        $("#timeline");

    if (!container) return;

    container.innerHTML =
        timeline.map(
            (item, index) => {

                return `

                    <article
                        class="timeline-item"
                        style="--delay:${index * 120}ms"
                    >

                        <div class="timeline-dot"></div>

                        <div class="timeline-content">

                            <span class="timeline-date">
                                ${item.year}
                            </span>

                            <h3>
                                ${item.title}
                            </h3>

                            <p>
                                ${item.text}
                            </p>

                        </div>

                    </article>

                `;

            }
        ).join("");

}


createTimeline();


/* =========================================================
   GALLERY
========================================================= */

const galleryFolders = {

    family: "family",

    lucky: "lucky",

    millicent: "millicent",

    kc: "kc",

    mama: "mama",

    ally: "ally",

    "real-teng": "real-teng"

};


/* =========================================================
   BUILD GALLERY
========================================================= */

async function buildGallery(
    folderName
) {

    const container =
        $("#galleryGrid");

    if (!container) return;


    container.innerHTML = `

        <div class="gallery-loading">

            <span>✦</span>

            <p>
                Looking through the memories...
            </p>

        </div>

    `;


    const folder =
        galleryFolders[folderName];

    if (!folder) return;


    const images =
        await findImages(folder);


    container.innerHTML = "";


    if (!images.length) {

        container.innerHTML = `

            <div class="gallery-empty">

                <span>✦</span>

                <strong>
                    No photos yet
                </strong>

                <small>
                    Add photos to<br>
                    assets/images/${folder}/
                </small>

            </div>

        `;

        return;

    }


    images.forEach(
        (src, index) => {

            const item =
                document.createElement("button");

            item.type =
                "button";

            item.className =
                "gallery-item";


            const img =
                document.createElement("img");

            img.src =
                src;

            img.alt =
                `${folderName} memory ${index + 1}`;

            img.loading =
                "lazy";


            const caption =
                document.createElement("span");

            caption.className =
                "gallery-caption";

            caption.textContent =
                `Memory ${String(
                    index + 1
                ).padStart(2, "0")}`;


            item.appendChild(
                img
            );

            item.appendChild(
                caption
            );


            item.addEventListener(
                "click",
                () => {

                    openLightbox(
                        src,
                        `${folderName} · Memory ${String(
                            index + 1
                        ).padStart(2, "0")}`
                    );

                }
            );


            container.appendChild(
                item
            );

        }
    );

}


buildGallery("family");


/* =========================================================
   GALLERY TABS
========================================================= */

document
    .querySelectorAll("[data-gallery]")
    .forEach(button => {

        button.addEventListener(
            "click",
            async () => {

                document
                    .querySelectorAll("[data-gallery]")
                    .forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });


                button.classList.add(
                    "active"
                );


                await buildGallery(
                    button.dataset.gallery
                );

            }
        );

    });


/* =========================================================
   VIDEO HELPERS
========================================================= */

function checkVideo(src) {

    return new Promise(resolve => {

        const video =
            document.createElement("video");

        video.preload =
            "metadata";

        video.onloadedmetadata =
            () => resolve(true);

        video.onerror =
            () => resolve(false);

        video.src =
            src;

    });

}


async function findVideos(folder) {

    const found = [];

    const checked =
        new Set();


    for (
        const filename of VIDEO_NAMES
    ) {

        const src =
            `${VIDEO_ROOT}${folder}/${filename}`;


        if (checked.has(src)) {
            continue;
        }

        checked.add(src);


        const exists =
            await checkVideo(src);


        if (exists) {

            found.push(src);

        }

    }


    return found;

}


/* =========================================================
   VIDEO ARCHIVE
========================================================= */

const videoPeople = [

    ["family", "Family memories"],

    ["lucky", "Lucky"],

    ["millicent", "Millicent"],

    ["kc", "KC"],

    ["mama", "Mama"],

    ["ally", "Ally"],

    ["real-teng", "Real Teng"],

    ["botchok", "Botchok"],

    ["bulingit", "Bulingit"],

    ["trixie", "Trixie"]

];


/* =========================================================
   CREATE VIDEO ARCHIVE
========================================================= */

async function createVideoSlots() {

    const grid =
        $("#videoGrid");

    if (!grid) return;

    grid.innerHTML = "";


    for (
        let index = 0;
        index < videoPeople.length;
        index++
    ) {

        const [
            folder,
            title
        ] =
            videoPeople[index];


        const videos =
            await findVideos(folder);


        if (videos.length) {

            videos.forEach(
                (videoSrc, videoIndex) => {

                    const card =
                        document.createElement(
                            "article"
                        );

                    card.className =
                        "video-card";


                    const video =
                        document.createElement(
                            "video"
                        );

                    video.src =
                        videoSrc;

                    video.controls =
                        true;

                    video.preload =
                        "metadata";

                    video.playsInline =
                        true;


                    const info =
                        document.createElement(
                            "div"
                        );

                    info.className =
                        "video-info";

                    info.innerHTML = `

                        <small>
                            VIDEO ARCHIVE
                        </small>

                        <h3>
                            ${title}
                        </h3>

                        <p>
                            Memory
                            ${videoIndex + 1}
                        </p>

                    `;


                    card.appendChild(
                        video
                    );

                    card.appendChild(
                        info
                    );

                    grid.appendChild(
                        card
                    );

                }
            );


            continue;

        }


        const card =
            document.createElement(
                "button"
            );

        card.type =
            "button";

        card.className =
            "video-card";


        card.addEventListener(
            "click",
            () => openVideoFolder(
                folder,
                title
            )
        );


        card.innerHTML = `

            <div class="video-placeholder">

                <div class="play-button">
                    ▶
                </div>

                <strong>
                    ${title}
                </strong>

                <span>
                    Add videos to
                    assets/videos/${folder}/
                </span>

            </div>

            <div class="video-info">

                <small>
                    VIDEO ARCHIVE
                </small>

                <h3>
                    ${title}
                </h3>

                <p>
                    No videos added yet.
                </p>

                <strong>
                    Open video space ↗
                </strong>

            </div>

        `;


        grid.appendChild(
            card
        );

    }

}


createVideoSlots();


/* =========================================================
   MODAL
========================================================= */

const modal =
    $("#modal");

const modalContent =
    $("#modalContent");


function openModal(content) {

    if (
        !modal ||
        !modalContent
    ) {
        return;
    }


    modalContent.innerHTML =
        content;


    modal.classList.add(
        "open"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );

}


function closeModal() {

    if (!modal) return;


    modal.classList.remove(
        "open"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );


    setTimeout(() => {

        if (modalContent) {

            modalContent.innerHTML =
                "";

        }

    }, 250);

}


if ($("#close")) {

    $("#close").addEventListener(
        "click",
        closeModal
    );

}


if ($(".shade")) {

    $(".shade").addEventListener(
        "click",
        closeModal
    );

}


/* =========================================================
   MEMBER PHOTO HTML
========================================================= */

function createModalPhoto(
    src,
    title,
    index
) {

    return `

        <figure class="modal-photo">

            <div
                class="modal-photo-image"
                role="button"
                tabindex="0"
                aria-label="Open ${title} memory ${index + 1}"
                onclick="openLightbox('${src}', '${title} · Memory ${String(index + 1).padStart(2, "0")}')"
                onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openLightbox('${src}', '${title} · Memory ${String(index + 1).padStart(2, "0")}'); }"
            >

                <img
                    src="${src}"
                    alt="${title} memory ${index + 1}"
                >

            </div>

            <figcaption class="modal-photo-caption">
                Memory ${String(index + 1).padStart(2, "0")}
            </figcaption>

        </figure>

    `;

}


/* =========================================================
   MODAL VIDEO HTML
========================================================= */

function createModalVideo(
    src,
    title,
    index
) {

    return `

        <article class="modal-video-card">

            <video
                src="${src}"
                controls
                playsinline
                preload="metadata"
            ></video>

            <div class="modal-video-label">
                ${title} · Video ${index + 1}
            </div>

        </article>

    `;

}


/* =========================================================
   PERSON MODAL
========================================================= */

async function openPerson(id) {

    const person =
        familyMembers.find(
            member =>
                member.id === id
        );


    if (!person) return;


    const images =
        await findImages(
            person.folder
        );


    const videos =
        await findVideos(
            person.folder
        );


    let photoHTML = "";


    if (images.length) {

        photoHTML = `

            <div class="modal-photo-grid">

                ${images
                    .slice(0, 12)
                    .map(
                        (src, index) =>
                            createModalPhoto(
                                src,
                                person.name,
                                index
                            )
                    )
                    .join("")
                }

            </div>

        `;

    } else {

        photoHTML = `

            <div class="modal-media-placeholder">

                <span>
                    ${person.icon}
                </span>

                <strong>
                    No photos yet
                </strong>

                <small>
                    Add photos to<br>
                    assets/images/${person.folder}/
                </small>

            </div>

        `;

    }


    let videoHTML = "";


    if (videos.length) {

        videoHTML = `

            <div class="modal-video-grid">

                ${videos
                    .slice(0, 6)
                    .map(
                        (src, index) =>
                            createModalVideo(
                                src,
                                person.name,
                                index
                            )
                    )
                    .join("")
                }

            </div>

        `;

    } else {

        videoHTML = `

            <div class="modal-media-placeholder">

                <span>
                    ▶
                </span>

                <strong>
                    No videos yet
                </strong>

                <small>
                    Add videos to<br>
                    assets/videos/${person.folder}/
                </small>

            </div>

        `;

    }


    openModal(`

        <div class="modal-eyebrow">
            FAMILY MEMBER
        </div>

        <h2>
            ${person.name}
        </h2>

        <p class="modal-description">
            ${person.description}
        </p>

        <h3 class="modal-section-title">
            Photos
        </h3>

        ${photoHTML}

        <h3 class="modal-section-title">
            Videos
        </h3>

        ${videoHTML}

    `);

}


/* =========================================================
   DOG MODAL
========================================================= */

async function openDog(id) {

    const dog =
        dogs.find(
            item =>
                item.id === id
        );


    if (!dog) return;


    const images =
        await findImages(
            dog.folder
        );


    const videos =
        await findVideos(
            dog.folder
        );


    let photosHTML;


    if (images.length) {

        photosHTML = `

            <div class="modal-photo-grid">

                ${images
                    .slice(0, 12)
                    .map(
                        (src, index) =>
                            createModalPhoto(
                                src,
                                dog.name,
                                index
                            )
                    )
                    .join("")
                }

            </div>

        `;

    } else {

        photosHTML = `

            <div class="modal-media-placeholder">

                <span>
                    ${dog.icon}
                </span>

                <strong>
                    No photos yet
                </strong>

                <small>
                    Add photos to<br>
                    assets/images/${dog.folder}/
                </small>

            </div>

        `;

    }


    let videosHTML;


    if (videos.length) {

        videosHTML = `

            <div class="modal-video-grid">

                ${videos
                    .slice(0, 6)
                    .map(
                        (src, index) =>
                            createModalVideo(
                                src,
                                dog.name,
                                index
                            )
                    )
                    .join("")
                }

            </div>

        `;

    } else {

        videosHTML = `

            <div class="modal-media-placeholder">

                <span>
                    ▶
                </span>

                <strong>
                    No videos yet
                </strong>

                <small>
                    Add videos to<br>
                    assets/videos/${dog.folder}/
                </small>

            </div>

        `;

    }


    openModal(`

        <div class="modal-eyebrow">
            OUR DOG
        </div>

        <h2>
            ${dog.name}
        </h2>

        <p class="modal-description">
            A little archive of paws, chaos,
            cuddles and the moments they became
            part of the family.
        </p>

        <h3 class="modal-section-title">
            Photos
        </h3>

        ${photosHTML}

        <h3 class="modal-section-title">
            Videos
        </h3>

        ${videosHTML}

    `);

}


/* =========================================================
   PLACE MODAL
========================================================= */

async function openPlace(id) {

    const place =
        places.find(
            item =>
                item.id === id
        );


    if (!place) return;


    const images =
        await findPlaceImages(
            place.folder
        );


    let imageHTML;


    if (images.length) {

        imageHTML = `

            <div class="modal-photo-grid">

                ${images
                    .slice(0, 12)
                    .map(
                        (src, index) =>
                            createModalPhoto(
                                src,
                                place.name,
                                index
                            )
                    )
                    .join("")
                }

            </div>

        `;

    } else {

        imageHTML = `

            <div class="modal-media-placeholder">

                <span>
                    ${place.icon}
                </span>

                <strong>
                    No photos yet
                </strong>

                <small>
                    Add photos to<br>
                    assets/images/places/${place.folder}/
                </small>

            </div>

        `;

    }


    openModal(`

        <div class="modal-eyebrow">
            FAMILY JOURNEY · CHAPTER
        </div>

        <h2>
            ${place.name}
        </h2>

        <p class="modal-description">
            ${place.description}
        </p>

        <h3 class="modal-section-title">
            Photos from ${place.name}
        </h3>

        ${imageHTML}

    `);

}


/* =========================================================
   FULL SCREEN IMAGE LIGHTBOX
========================================================= */

const lightbox =
    $("#lightbox");

const lightboxImage =
    $("#lightboxImage");

const lightboxCaption =
    $("#lightboxCaption");

const lightboxClose =
    $("#lightboxClose");


function openLightbox(
    src,
    caption = "Family memory"
) {

    if (
        !lightbox ||
        !lightboxImage
    ) {
        return;
    }


    lightboxImage.src =
        src;


    lightboxImage.alt =
        caption;


    if (lightboxCaption) {

        lightboxCaption.textContent =
            caption;

    }


    lightbox.classList.add(
        "open"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeLightbox() {

    if (!lightbox) return;


    lightbox.classList.remove(
        "open"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    setTimeout(() => {

        if (lightboxImage) {

            lightboxImage.src =
                "";

        }

    }, 200);

}


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


const lightboxShade =
    document.querySelector(
        ".lightbox-shade"
    );


if (lightboxShade) {

    lightboxShade.addEventListener(
        "click",
        closeLightbox
    );

}


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            if (
                lightbox &&
                lightbox.classList.contains(
                    "open"
                )
            ) {

                closeLightbox();

                return;

            }


            if (
                modal &&
                modal.classList.contains(
                    "open"
                )
            ) {

                closeModal();

            }

        }

    }
);


/* =========================================================
   VIDEO FOLDER MODAL
========================================================= */

async function openVideoFolder(
    folder,
    title
) {

    const videos =
        await findVideos(
            folder
        );


    if (videos.length) {

        openModal(`

            <div class="modal-eyebrow">
                MOVING MEMORIES
            </div>

            <h2>
                ${title}
            </h2>

            <p class="modal-description">
                A collection of moving memories
                from ${title}.
            </p>

            <div class="modal-video-grid">

                ${videos
                    .map(
                        (src, index) =>
                            createModalVideo(
                                src,
                                title,
                                index
                            )
                    )
                    .join("")
                }

            </div>

        `);

        return;

    }


    openModal(`

        <div class="modal-eyebrow">
            MOVING MEMORIES
        </div>

        <h2>
            ${title}
        </h2>

        <div class="modal-media-placeholder">

            <span>
                ▶
            </span>

            <strong>
                No videos yet
            </strong>

            <small>
                Add videos to<br>
                assets/videos/${folder}/
            </small>

        </div>

    `);

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            event => {

                const target =
                    document.querySelector(
                        anchor.getAttribute(
                            "href"
                        )
                    );


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================================
   NAVIGATION ACTIVE STATE
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        "nav a[href^='#']"
    );


const updateActiveNav = () => {

    let current =
        "home";


    sections.forEach(section => {

        const rect =
            section.getBoundingClientRect();


        if (
            rect.top <= 150 &&
            rect.bottom >= 150
        ) {

            current =
                section.id;

        }

    });


    navLinks.forEach(link => {

        link.classList.toggle(
            "active",

            link.getAttribute(
                "href"
            ) ===
            `#${current}`
        );

    });

};


window.addEventListener(
    "scroll",
    updateActiveNav,
    {
        passive: true
    }
);


updateActiveNav();


/* =========================================================
   MAKE FUNCTIONS AVAILABLE TO HTML
========================================================= */

window.openPerson =
    openPerson;

window.openDog =
    openDog;

window.openPlace =
    openPlace;

window.openImage =
    openLightbox;

window.openLightbox =
    openLightbox;

window.openVideoFolder =
    openVideoFolder;

window.closeModal =
    closeModal;

window.closeLightbox =
    closeLightbox;