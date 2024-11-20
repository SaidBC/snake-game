import PropTypes from "prop-types";

function ShowError({ path, error }) {
  if (typeof error === "string") return <p className="error-text">{error}</p>;
  if (!error.find((e) => e.path === path)) return <></>;
  return <p className="error-text">{error.find((e) => e.path === path).msg}</p>;
}

ShowError.propTypes = {
  path: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default ShowError;
