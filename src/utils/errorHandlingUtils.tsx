import { notifyFailure } from "./toastUtils";

function displayErrorFromServer(objFromServer: any) {
  console.log(objFromServer);
  if (objFromServer.errors) {
    let error = Object.entries(objFromServer.errors).map(
      ([key, value]) => (value as Array<string>)[0]
    );
    notifyFailure(`Error : ${error.join("\r\n")}`);
  }

  if (objFromServer.error) {
    notifyFailure(`Error : ${objFromServer.error}`);
  }
}

export { displayErrorFromServer };
