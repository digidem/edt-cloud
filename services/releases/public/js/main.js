const org = "digidem";
const repo = "edt-offline";
const url = "https://edt-offline-releases.nyc3.digitaloceanspaces.com";
const balenaUrl =
  "https://api.balena-cloud.com/v6/device_type?$select=name,slug,logo&$expand=is_of__cpu_architecture($select=slug)&$filter=is_default_for__application/any(idfa:((idfa/is_host%20eq%20true)%20and%20(idfa/is_archived%20eq%20false)%20and%20(idfa/owns__release/any(r:(status%20eq%20%27success%27)%20and%20(is_final%20eq%20true)%20and%20(is_invalidated%20eq%20false))))%20and%20not(contains(idfa/app_name,%27-esr%27)))&$orderby=name%20asc";

const parseReleases = (releases, devices) => {
  return releases.map((release) => {
    const [folder, file] = release.Key.split("/");
    const slug = file.split("-v")[0];
    const version = folder.split("_")[1];
    const device = devices.filter((d) => d.slug === slug)[0];
    const downloadUrl = `https://edt-offline-releases.nyc3.cdn.digitaloceanspaces.com/${release.Key}`;
    return {
      folder,
      file,
      version,
      downloadUrl,
      device,
    };
  });
};

const fetchBalenaDevices = (balenaUrl) => {
  return fetch(balenaUrl)
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
    });
};

const fetchReleases = (location, devices) => {
  const parser = new XMLParser();
  return fetch(location)
    .then((response) => response.text())
    .then((data) => parser.parse(data))
    .then((json) => json?.ListBucketResult?.Contents)
    .then((content) => parseReleases(content, devices))
    .catch((err) => {
      console.error(err);
    });
};

const fetchLatestRelease = (org, repo) => {
  return fetch(`https://api.github.com/repos/${org}/${repo}/releases/latest`)
    .then((response) => response.json())
    .then((data) => ({
      tag: data.tag_name,
      url: data.html_url,
      draft: data.draft,
    }))
    .catch((err) => {
      console.error(err);
    });
};

const generateHtml = ({ version, downloadUrl, device }) => {
  const { logo, name, is_of__cpu_architecture } = device;
  return `
		<tr>
			<th scope="row"><img height="35px" src=${logo} /></th>
      <td>${name}</td>
			<td>${version}</td>
      <td>${is_of__cpu_architecture[0].slug}</td>
			<td><a href="${downloadUrl}" download class="btn btn-success">Download</a></td>
		</tr>
		`;
};

(async function () {
  var table = document.getElementById("download-table");
  const latest = await fetchLatestRelease(org, repo);
  const devices = await fetchBalenaDevices(balenaUrl);
  const releases = await fetchReleases(url, devices.d);
  releases
    .filter((release) => release.version === latest.tag)
    .forEach((release) => {
      table.insertAdjacentHTML("afterbegin", generateHtml(release));
    });
})();
