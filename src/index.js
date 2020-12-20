import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Typography, Button, Hidden } from "@material-ui/core";
import errorImg from "./assets/images/error.png";
import store from "./app/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Hidden xsUp xsDown implementation="js">
          <img src={errorImg} alt="Error" />
        </Hidden>
        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <svg height="512" viewBox="0 0 512 512" width="512">
                <g>
                  <g id="_x3C_Group_x3E__31_">
                    <path
                      d="m256 65.719c-98.609 0-183.803 43.227-223.953 105.877-15.731 24.546-21.547 52.073-21.547 81.149 0 32.114 10.767 62.331 29.715 88.734 3.037 4.232 4.657 9.316 4.655 14.525l.968 91.201c-.004 11.505 8.412 18.731 18.414 13.045l66.857-40.15c6.211-3.531 13.633-4.238 20.395-1.93 31.25 10.663 65.951 16.602 102.497 16.602 104.534 0 195.993-43.578 232.696-112.376 11.484-21.527 17.804-45.033 17.804-69.65-.001-103.292-111.258-187.027-248.501-187.027z"
                      fill="#b3e59f"
                    />
                    <path
                      d="m273 409.772c-36.545 0-88.92-4.629-120.17-15.293-6.762-2.307-14.184-1.601-20.395 1.93l-56.569 29.914c-3.289 1.739-7.257-.594-7.336-4.314l-1.66-78.006c.002-5.209-1.618-10.293-4.655-14.525-18.948-26.402-37.715-74.619-37.715-106.733 0-20.265 4.3-39.772 12.221-58.047-18.64 26.241-29.221 56.213-29.221 88.047 0 32.114 10.767 62.331 29.715 88.734 3.037 4.232 4.657 9.316 4.655 14.525l-.032 95.201c-.004 11.505 12.412 18.731 22.414 13.045l68.857-39.15c6.211-3.531 13.633-4.238 20.395-1.93 31.25 10.663 65.951 16.602 102.497 16.602 110.317 0 203.827-54.107 236.279-128.98-41.84 58.9-124.336 98.98-219.28 98.98z"
                      fill="#95d6a4"
                    />
                    <g>
                      <path
                        d="m310.757 168.716-33.945.013c-.527 0-12.098 15.534-12.098 15.727v119.62c0 8.693 4.047 12.74 12.739 12.74s15.739-4.047 15.739-12.74v-36.304c6.501-.033 13.493-.062 17.565-.062 27.654 0 50.153-22.205 50.153-49.497 0-27.293-22.498-49.497-50.153-49.497zm0 67.514c-3.435 0-8.904.021-14.419.046-1.657.008-3.007-1.329-3.015-2.986-.027-5.771-.049-11.533-.049-15.077 0-3.053-.013-8.968-.028-15.008-.004-1.66 1.34-3.008 3-3.008h14.511c10.123 0 18.675 8.25 18.675 18.016s-8.552 18.017-18.675 18.017z"
                        fill="#f5fcff"
                      />
                      <g>
                        <path
                          d="m292.453 305.818c-8.692 0-15.739-7.047-15.739-15.74v-119.62c0-.193.022-.38.029-.571.012-.327.017-.654.049-.978.005-.054.013-.125.02-.178-.312.013-14.621.745-15.098 15.727v119.62c0 8.693 7.047 15.74 15.739 15.74 8.115 0 14.79-6.143 15.642-14.032-.214.008-.425.032-.642.032z"
                          fill="#e6f7fe"
                        />
                      </g>
                      <g>
                        <path
                          d="m214.311 317.818c-26.139 0-45.404-19.268-45.404-45.409 0-14.464 4.51-27.436 14.754-36.139 8.27-7.026 18.974-11.27 30.65-11.27 26.139 0 47.404 21.268 47.404 47.409 0 10.534-3.453 20.277-9.286 28.155-8.644 11.673-22.512 17.254-38.118 17.254zm0-61.15c-8.678 0-15.739 7.061-15.739 15.74s7.06 15.74 15.739 15.74c8.678 0 15.739-7.061 15.739-15.74s-7.061-15.74-15.739-15.74z"
                          fill="#f5fcff"
                        />
                      </g>
                      <g>
                        <g>
                          <path
                            d="m409.946 317.924c-17.381-.106-33.657-3.897-46.846-18.452-5.837-6.441-5.348-16.396 1.093-22.234 1.61-1.459 1.44-2.523 3.37-3.198 5.79-2.023 12.483-.541 16.862 4.291 7.128 7.865 18.115 10.169 25.522 10.111 2.02-.016 3.821-.19 5.428-.489 11.366-2.114 14.992-10.48 15.211-13.318.094-1.225.913-13.626-10.352-15.374-15.816-2.455-35.12-6.735-48.44-21.903-8.799-10.018-13.182-22.498-9.83-35.79 2.275-9.019 7.429-16.817 14.725-22.599 3.8-3.012 8.182-5.477 13.04-7.283 24.245-9.013 50.239 5.206 53.123 6.857 6.787 3.885 9.585 12.059 6.934 19.154-.296.791-1.034 1.147-1.467 1.904-4.307 7.526-13.23 10.148-20.766 5.872-4.079-2.278-17.588-8.414-26.488-5.106-3.06 1.137-5.682 3.576-7.108 5.639-.681.985-1.172 2.073-1.472 3.261-.83 3.293-.043 7.037 1.959 9.316 5.799 6.604 14.421 9.023 28.302 11.177 23.402 3.632 39.057 23.523 37.224 47.296-.639 8.291-3.656 16.836-9.116 24.094-8.137 10.816-21.699 16.774-40.908 16.774z"
                            fill="#f5fcff"
                          />
                        </g>
                      </g>
                      <g fill="#e6f7fe">
                        <path d="m393.48 206.772c-.001.003.003.003.002.006 1.372-2.434 3.784-4.308 7.215-5.583 8.9-3.307 22.496 2.425 26.575 4.703 7.536 4.275 17.115 1.652 21.422-5.874.268-.469.51-.946.725-1.43.207-.465.386-.936.545-1.41.006-.019.015-.037.021-.056-4.079 1.352-8.685 1.055-12.714-1.23-4.079-2.278-17.675-8.011-26.575-4.703-4.521 1.681-13.462 5.109-17.216 15.577z" />
                        <path d="m419.946 309.924c-17.381-.106-35.657-5.897-48.846-20.452-3.943-4.352-4.988-10.304-3.273-15.51-2.026.668-3.951 1.751-5.634 3.276-6.441 5.838-6.93 15.792-1.093 22.234 13.189 14.555 31.465 20.346 48.846 20.452 19.56 0 33.254-8.257 41.338-19.375-7.9 5.72-18.322 9.375-31.338 9.375z" />
                        <path d="m417.919 260.87c11.265 1.748 10.761 12.541 10.667 13.766-.227 2.937-1.961 11.794-14.437 13.516 25.532 4.982 28.086-15.954 27.192-23.486-.145-1.22-2.157-12.048-13.422-13.796-15.816-2.455-33.805-6.343-47.125-21.511-8.799-10.018-12.161-24.493-8.83-37.79 2.228-8.892 6.386-13.853 6.385-13.853-.484.349-1.549 1.166-1.619 1.222-1.352 1.07-11.092 8.558-14.766 22.631-3.463 13.264.031 27.772 8.83 37.79 13.32 15.167 31.309 19.056 47.125 21.511z" />
                      </g>
                      <g>
                        <path
                          d="m224.311 309.818c-26.139 0-47.404-21.268-47.404-47.409 0-10.526 3.452-20.258 9.277-28.134-11.684 8.643-19.277 22.516-19.277 38.134 0 26.142 21.265 47.409 47.404 47.409 15.614 0 29.484-7.592 38.127-19.276-7.874 5.824-17.604 9.276-28.127 9.276z"
                          fill="#e6f7fe"
                        />
                      </g>
                      <g>
                        <path
                          d="m127.426 317.818c-41.654 0-73.542-31.892-73.542-73.551 0-20.503 6.209-39.125 19.512-52.751 13.726-14.059 32.877-22.8 54.03-22.8 41.654 0 75.542 33.892 75.542 75.551 0 23.528-10.81 44.579-27.723 58.446-13.033 10.685-29.69 15.105-47.819 15.105zm0-117.621c-24.297 0-44.064 19.769-44.064 44.07s19.767 44.07 44.064 44.07c24.298 0 44.065-19.769 44.065-44.07s-19.767-44.07-44.065-44.07z"
                          fill="#f5fcff"
                        />
                      </g>
                      <g>
                        <path
                          d="m137.426 309.818c-41.654 0-75.542-33.892-75.542-75.551 0-18.291 6.536-35.081 17.39-48.166-16.721 13.869-27.39 34.794-27.39 58.166 0 41.659 33.888 75.551 75.542 75.551 23.366 0 44.285-10.667 58.152-27.385-13.082 10.851-29.867 17.385-48.152 17.385z"
                          fill="#e6f7fe"
                        />
                      </g>
                    </g>
                    <ellipse
                      cx="256"
                      cy="372.711"
                      fill="#f5fcff"
                      rx="20.162"
                      ry="20.165"
                    />
                    <ellipse
                      cx="185.432"
                      cy="372.711"
                      fill="#f5fcff"
                      rx="20.162"
                      ry="20.165"
                    />
                    <path
                      d="m200.432 377.876c-11.135 0-20.162-9.028-20.162-20.165 0-1.59.203-3.13.551-4.614-8.909 2.088-15.551 10.067-15.551 19.614 0 11.137 9.027 20.165 20.162 20.165 9.545 0 17.522-6.641 19.611-15.551-1.483.348-3.022.551-4.611.551z"
                      fill="#e6f7fe"
                    />
                    <ellipse
                      cx="326.568"
                      cy="372.711"
                      fill="#f5fcff"
                      rx="20.162"
                      ry="20.165"
                    />
                    <g fill="#e6f7fe">
                      <path d="m271 377.876c-11.135 0-20.162-9.028-20.162-20.165 0-1.59.203-3.13.551-4.614-8.909 2.088-15.551 10.067-15.551 19.614 0 11.137 9.027 20.165 20.162 20.165 9.545 0 17.522-6.641 19.611-15.551-1.483.348-3.022.551-4.611.551z" />
                      <path d="m341.568 377.876c-11.135 0-20.162-9.028-20.162-20.165 0-1.59.203-3.13.551-4.614-8.909 2.088-15.551 10.067-15.551 19.614 0 11.137 9.027 20.165 20.162 20.165 9.545 0 17.522-6.641 19.611-15.551-1.483.348-3.022.551-4.611.551z" />
                    </g>
                  </g>
                  <g>
                    <path d="m310.757 192.697h-14.511c-4.661.038-10.446 3.949-10.5 10.528.036 12.146.014 17.1.077 30.101.027 5.773 4.732 10.451 10.5 10.451 3.913-.018 10.217-.044 14.434-.046 14.188 0 26.175-11.685 26.175-25.517s-11.986-25.517-26.175-25.517zm0 36.033c-2.499 0-6.07.011-9.954.027-.034-7.767-.023-11.307-.046-21.06h10c5.953 0 11.175 4.914 11.175 10.517s-5.222 10.516-11.175 10.516z" />
                    <path d="m403.31 208.225c5.343-1.986 16.032 1.834 20.261 4.196 11.103 6.298 25.292 2.407 31.632-8.672 6.365-11.122 2.496-25.349-8.625-31.715-3.196-1.83-32.021-17.579-59.463-7.378-12.19 4.532-21.803 12.681-27.652 23.117-10.232-15.944-28.233-26.557-48.706-26.557h-33.304c-11.538-.23-23.717 10.195-23.239 23.241v50.296c-10.017-10.611-24.195-17.254-39.904-17.254-2.718 0-5.42.204-8.09.6-10.989-33.007-42.146-56.883-78.795-56.883-18.404 0-35.851 5.921-50.454 17.124-3.287 2.521-3.907 7.229-1.386 10.516 2.522 3.287 7.229 3.908 10.516 1.386 11.961-9.175 26.25-14.025 41.324-14.025 37.519 0 68.042 30.527 68.042 68.051s-30.524 68.051-68.042 68.051-68.042-30.527-68.042-68.051c0-10.352 2.274-20.296 6.759-29.556 1.806-3.728.247-8.214-3.48-10.02-3.727-1.805-8.214-.247-10.02 3.481-5.48 11.315-8.259 23.459-8.259 36.095 0 45.794 37.252 83.051 83.042 83.051 18.094 0 34.842-5.835 48.498-15.698 10.213 10.044 23.835 15.698 38.387 15.698 16.034 0 30.482-6.911 40.529-17.908 2.417 10.253 11.635 17.908 22.615 17.908 12.813 0 23.238-10.425 23.238-23.24v-28.838c3.932-.017 7.555-.028 10.065-.028 23.249 0 43.313-13.683 52.424-33.325.632.828 1.288 1.638 1.977 2.422 14.265 16.242 33.235 21.121 51.61 23.973 1.165.181 4.711.731 4.339 5.777-.344 4.449-4.224 6.83-11.22 6.884-6.188.065-14.729-1.935-19.905-7.647-7.53-8.603-23.129-10.624-32.826-1.615-9.495 8.605-10.219 23.332-1.614 32.827 13.27 14.644 32.575 22.782 54.358 22.916h.046c36.869 0 55.652-25.81 57.502-49.791 2.142-27.785-16.174-51.035-43.552-55.284-13.992-2.171-20.002-4.371-23.816-8.714-.258-.308-.596-1.449-.323-2.533.108-.426.434-1.719 3.553-2.878zm-188.999 55.943c4.543 0 8.239 3.697 8.239 8.241 0 4.543-3.696 8.24-8.239 8.24s-8.239-3.697-8.239-8.24c0-4.545 3.696-8.241 8.239-8.241zm0 48.15c-10.161 0-19.707-3.792-27.029-10.573 3.871-4.03 7.338-8.445 10.34-13.187 4.228 4.368 10.144 7.092 16.689 7.092 12.814 0 23.239-10.425 23.239-23.24s-10.425-23.241-23.239-23.241c-1.374 0-2.717.127-4.026.356.109-1.74.184-3.49.184-5.257 0-3.895-.29-7.721-.811-11.475 1.54-.18 3.092-.293 4.654-.293 22.003 0 39.904 17.903 39.904 39.91-.001 22.004-17.902 39.908-39.905 39.908zm96.446-52.107c-4.081 0-11.088.03-17.603.063-4.127.021-7.462 3.373-7.462 7.5v36.304c0 4.543-3.696 8.24-8.238 8.24-4.543 0-8.239-3.697-8.239-8.24v-119.479c-.05-4.211 3.389-8.464 8.239-8.383h33.304c23.519 0 42.653 18.84 42.653 41.998s-19.135 41.997-42.654 41.997zm78.052-36.679c7.271 8.28 17.528 11.271 32.787 13.639 19.426 3.015 32.42 19.547 30.897 39.309-1.335 17.306-15.209 35.933-42.52 35.944-17.522-.112-32.905-6.5-43.315-17.988-3.051-3.367-2.794-8.589.572-11.641 2.663-2.294 7.653-3.339 11.637.573 10.701 11.808 26.526 12.592 31.138 12.575 18.064-.142 25.327-11.255 26.059-20.731.7-9.098-4.319-19.786-16.994-21.752-15.18-2.356-30.977-5.768-42.64-19.049-7.194-8.191-9.951-20.073-7.193-31.007 2.847-11.287 11.269-20.285 23.105-24.687 21.406-7.956 45.759 5.75 46.784 6.337 3.943 2.257 5.315 7.302 3.059 11.246-2.247 3.929-7.277 5.308-11.256 3.052-.187-.105-18.862-10.381-32.845-5.186-8.685 3.229-11.792 8.998-12.87 13.27-1.429 5.665-.018 11.984 3.595 16.096z" />
                    <path d="m127.426 295.837c28.433 0 51.565-23.134 51.565-51.57s-23.132-51.57-51.565-51.57-51.564 23.134-51.564 51.57 23.131 51.57 51.564 51.57zm0-88.14c20.162 0 36.565 16.405 36.565 36.57s-16.403 36.57-36.565 36.57-36.564-16.405-36.564-36.57 16.402-36.57 36.564-36.57z" />
                    <path d="m283.662 372.712c0-15.254-12.409-27.665-27.662-27.665s-27.662 12.41-27.662 27.665 12.409 27.665 27.662 27.665 27.662-12.411 27.662-27.665zm-40.324 0c0-6.983 5.68-12.665 12.662-12.665s12.662 5.681 12.662 12.665-5.68 12.665-12.662 12.665-12.662-5.682-12.662-12.665z" />
                    <path d="m157.77 372.712c0 15.254 12.409 27.665 27.662 27.665s27.662-12.41 27.662-27.665-12.409-27.665-27.662-27.665-27.662 12.41-27.662 27.665zm40.324 0c0 6.983-5.68 12.665-12.662 12.665s-12.662-5.681-12.662-12.665 5.68-12.665 12.662-12.665 12.662 5.681 12.662 12.665z" />
                    <path d="m326.568 345.047c-15.253 0-27.662 12.41-27.662 27.665s12.409 27.665 27.662 27.665 27.662-12.41 27.662-27.665-12.409-27.665-27.662-27.665zm0 40.329c-6.982 0-12.662-5.681-12.662-12.665s5.68-12.665 12.662-12.665 12.662 5.681 12.662 12.665-5.68 12.665-12.662 12.665z" />
                    <path d="m512 252.746c0-65.708-43.101-126.491-115.295-162.595-3.704-1.853-8.209-.351-10.063 3.354-1.853 3.705-.351 8.21 3.354 10.063 67.003 33.506 107.004 89.274 107.004 149.178 0 98.991-108.112 179.526-241 179.526h-.191c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5h.191c67.993 0 131.999-19.99 180.226-56.287 48.864-36.775 75.774-85.87 75.774-138.239z" />
                    <path d="m221.792 430.473c-22.788-2.418-44.948-7.263-65.866-14.401-8.781-2.996-18.449-2.082-26.524 2.509l-68.857 39.15c-3.385 1.924-6.359.615-7.479-.038-1.122-.652-3.729-2.591-3.728-6.485l.032-95.201c.002-6.835-2.093-13.371-6.062-18.9-18.519-25.807-28.308-54.978-28.308-84.361 0-98.992 108.112-179.527 241-179.527 35.804 0 70.266 5.724 102.426 17.012 3.91 1.373 8.189-.684 9.561-4.593 1.372-3.908-.685-8.189-4.593-9.561-33.761-11.85-69.894-17.858-107.394-17.858-67.993 0-131.999 19.99-180.226 56.287-48.864 36.775-75.774 85.87-75.774 138.24 0 32.54 10.762 64.736 31.122 93.106 2.126 2.963 3.25 6.473 3.248 10.15l-.032 95.201c-.003 8.104 4.177 15.377 11.182 19.454 5.944 3.287 14.432 4.6 22.439.113l68.857-39.15c4.345-2.471 9.545-2.964 14.266-1.353 21.974 7.498 45.231 12.586 69.127 15.121 4.112.437 7.813-2.548 8.25-6.667.436-4.118-2.549-7.811-6.667-8.248z" />
                    <path d="m469.675 423.65c-23.976 19.167-51.51 34.758-81.839 46.343-3.87 1.478-5.808 5.813-4.33 9.683 1.142 2.989 3.988 4.826 7.008 4.826.89 0 1.794-.159 2.675-.496 31.779-12.139 60.665-28.503 85.853-48.639 3.235-2.586 3.762-7.306 1.175-10.542-2.588-3.235-7.307-3.762-10.542-1.175z" />
                    <path d="m44.935 77.925c1.563 0 3.14-.487 4.488-1.496 18-13.472 38.002-25.103 59.451-34.567 3.79-1.672 5.506-6.1 3.834-9.89s-6.1-5.504-9.89-3.834c-22.487 9.923-43.476 22.13-62.383 36.282-3.316 2.482-3.992 7.182-1.51 10.499 1.473 1.968 3.727 3.006 6.01 3.006z" />
                    <path d="m17.763 140.569c1.67 1.551 7.016 2.812 10.542-1.165 34.238-42.738 86.264-73.927 146.495-87.822 4.036-.931 6.553-4.958 5.622-8.994-.932-4.036-4.961-6.555-8.994-5.622-63.505 14.65-118.491 47.7-154.829 93.061-2.59 3.232-2.069 7.952 1.164 10.542z" />
                    <path d="m495.159 367.389c-3.185-2.648-7.914-2.214-10.562.97-41.587 50.001-107.742 82.926-181.501 90.332-4.122.414-7.127 4.09-6.713 8.211.388 3.867 3.648 6.751 7.454 6.751.25 0 .503-.013.758-.038 77.642-7.795 147.454-42.664 191.536-95.665 2.647-3.184 2.213-7.913-.972-10.561z" />
                  </g>
                </g>
              </svg>
              <Typography
                style={{ marginBottom: "1rem" }}
                variant="h3"
                component="h3"
              >
                Something went wrong!
              </Typography>
              <Typography
                style={{ marginBottom: "1rem" }}
                variant="h4"
                component="h4"
              >
                Please check your internet connection
              </Typography>
              <Button
                color="secondary"
                variant="contained"
                onClick={resetErrorBoundary}
              >
                Try again
              </Button>
            </div>
          )}
          onReset={() => {
            window.location.reload();
          }}
        >
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
