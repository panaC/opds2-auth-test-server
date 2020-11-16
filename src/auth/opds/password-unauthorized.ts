
import { TaJsonSerialize } from "r2-lcp-js/dist/es6-es2015/src/serializable";
import { OPDSAuthentication } from "r2-opds-js/dist/es6-es2015/src/opds/opds2/opds2-authentication";
import {
    OPDSAuthenticationDoc,
} from "r2-opds-js/dist/es6-es2015/src/opds/opds2/opds2-authentication-doc";
import {
    OPDSAuthenticationLabels,
} from "r2-opds-js/dist/es6-es2015/src/opds/opds2/opds2-authentication-labels";
import { OPDSLink } from "r2-opds-js/dist/es6-es2015/src/opds/opds2/opds2-link";
import { resolveSelfUrl } from "src/utils";

export const passwordUnauthorizedDoc = (addJson: any = undefined) => {
    const opdsAuthDoc = new OPDSAuthenticationDoc;

    opdsAuthDoc.Id = "";
    opdsAuthDoc.Title = "OAUTH2 password authentification";

    const logoLink = new OPDSLink();
    logoLink.Href = "https://www.edrlab.org/wp-content/uploads/2016/12/edrlab_logo@2x.jpg";
    logoLink.Rel = ["logo"];
    logoLink.TypeLink = "image/jpeg";

    opdsAuthDoc.Links = [logoLink]

    const opdsAuth = new OPDSAuthentication();

    opdsAuth.Type = "http://opds-spec.org/auth/oauth/password";
    opdsAuth.Labels = new OPDSAuthenticationLabels();
    opdsAuth.Labels.Login = "LOGIN";
    opdsAuth.Labels.Password = "PASSWORD";

    const authenticateLink = new OPDSLink();
    authenticateLink.Rel = ["authenticate"];
    authenticateLink.TypeLink = "application/json";
    authenticateLink.Href = resolveSelfUrl("/password");

    const refreshLink = new OPDSLink();
    refreshLink.Rel = ["refresh"];
    refreshLink.TypeLink = "application/json";
    refreshLink.Href = resolveSelfUrl("/password");

    opdsAuth.Links = [authenticateLink, refreshLink];

    opdsAuthDoc.Authentication = [opdsAuth];

    opdsAuthDoc.AdditionalJSON = addJson;

    const opdsAuthDocSerialize = TaJsonSerialize(opdsAuthDoc);

    return opdsAuthDocSerialize;
}