import axios from "axios";

module.exports = function viewPdf(drawingnumber) {
  axios
    .get(`http://nat005app/ViPPDFTEST/api/GetPDF/${drawingnumber}/cogor`)
    .then(res => {});
};
