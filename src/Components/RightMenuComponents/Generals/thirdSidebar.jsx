import React from 'react'

function ThirdSidebar() {
    return (
        <div>
            <div>
                <div>
                    Movie Details
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9115 12.0003L19.1886 17.2822C19.579 17.6729 19.5787 18.306 19.188 18.6964C18.7973 19.0867 18.1641 19.0864 17.7738 18.6957L12.4963 13.4135L7.20658 18.6953C6.81577 19.0856 6.1826 19.0851 5.79237 18.6943C5.40213 18.3035 5.4026 17.6703 5.79342 17.2801L11.0827 11.9986L5.79565 6.70679C5.4053 6.31609 5.40559 5.68292 5.79629 5.29257C6.18699 4.90223 6.82016 4.90251 7.2105 5.29321L12.498 10.5855L17.7739 5.31734C18.1648 4.92711 18.7979 4.92758 19.1881 5.31839C19.5784 5.70921 19.5779 6.34237 19.1871 6.73261L13.9115 12.0003Z" fill="white" />
                </svg>
            </div>
            <div>
                <div>
                    <div>Image</div>
                    {/* image */}
                </div>
                <div>
                    <div>Title</div>
                    <div></div>
                </div>
                <div>
                    <div>Opening Crawl</div>
                    <div></div>
                </div>
                <div>
                    <div>Genere</div>
                    <div></div>
                </div>
            </div>
            <div>
                <button>Close</button>
            </div>
        </div>
    )
}

export default ThirdSidebar;