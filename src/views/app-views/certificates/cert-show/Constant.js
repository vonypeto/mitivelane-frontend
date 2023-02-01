import React from "react";
import { Col } from "antd";
import { Carousel } from "@trendyol-js/react-carousel";

import PDFTemplate from "components/shared-components/Documents";

//DefaultCert Template Dropdown
import FileTest from "assets/files/test.pdf";
import FileTestNoBorder from "assets/files/test-file-noborder.pdf";

export const defaultGeneralCert = [
  {
    id: 1,
    Details: "Goverment Details",
    isOpen: false,
    type: "government",
    data: [
      {
        id: 1,
        formName: "firstLogo",
        type: "file",
        titleName: "FirstLogo",
        logoID: 1,
      },
      {
        id: 2,
        formName: "secondLogo",
        type: "file",
        titleName: "SecondLogo",
        logoID: 2,
      },
      {
        id: 3,
        formName: "country",
        type: "text",
        titleName: "Country",
      },
      {
        id: 4,
        formName: "province",
        type: "text",

        titleName: "Province",
      },
      {
        id: 5,
        formName: "municipality",
        type: "text",

        titleName: "Municipality",
      },
      {
        id: 6,
        formName: "organization",
        type: "text",

        titleName: "Barangay",
      },
      {
        id: 7,
        formName: "office",
        type: "text",
        titleName: "Ofiice",
      },
      {
        id: 8,
        formName: "clearance",
        titleName: "Clearance Type",
        type: "text",
      },
      {
        id: 9,
        formName: "ornumber",
        titleName: "OR. No.",
        type: "text",
      },
      {
        id: 10,
        formName: "issued_at",
        titleName: "Issued at",
        type: "date",
      },
      {
        id: 11,
        formName: "issued_on",
        titleName: "Issued on",
        type: "date",
      },
    ],
  },

  {
    id: 3,
    Details: "Content",
    isOpen: false,
    type: "content",
    data: [
      {
        id: 2,
        formName: "content",
        titleName: "Content Editor",
        type: "editor",
      },
    ],
  },
  {
    id: 4,
    Details: "Signatures",
    isOpen: false,
    type: "signature",
    data: [
      {
        id: 2,
        formName: "test",
        titleName: "multiform",
        type: "multiform",
      },
    ],
  },
];

//DefaultCert Template Dropdown
export const defaultGeneralBlotter = [
  {
    id: 1,
    Details: "Goverment Details",
    isOpen: false,
    type: "government",
    data: [
      {
        id: 1,
        formName: "firstLogo",
        type: "file",
        titleName: "FirstLogo",
        logoID: 1,
      },
      {
        id: 2,
        formName: "secondLogo",
        type: "file",
        titleName: "SecondLogo",
        logoID: 2,
      },
      {
        id: 3,
        formName: "republic",
        type: "text",
        titleName: "Country",
      },
      {
        id: 4,
        formName: "munipality",
        type: "text",

        titleName: "Municipality",
      },
      {
        id: 5,
        formName: "organization",
        type: "text",

        titleName: "Organization",
      },
      {
        id: 6,
        formName: "office",
        type: "text",
        titleName: "Ofiice",
      },
      {
        id: 7,
        formName: "clearance",
        titleName: "Clearance Type",
        type: "text",
      },
    ],
  },
];

export const defaultGeneralBusiness = [
  {
    id: 1,
    Details: "Goverment Details",
    isOpen: false,
    type: "government",
    data: [
      {
        id: 1,
        formName: "firstLogo",
        type: "file",
        titleName: "FirstLogo",
        logoID: 1,
      },
      {
        id: 2,
        formName: "secondLogo",
        type: "file",
        titleName: "SecondLogo",
        logoID: 2,
      },
      {
        id: 3,
        formName: "republic",
        type: "text",
        titleName: "Country",
      },
      {
        id: 4,
        formName: "munipality",
        type: "text",

        titleName: "Municipality",
      },
      {
        id: 5,
        formName: "organization",
        type: "text",

        titleName: "Organization",
      },
      {
        id: 6,
        formName: "office",
        type: "text",
        titleName: "Ofiice",
      },
      {
        id: 7,
        formName: "clearance",
        titleName: "Clearance Type",
        type: "text",
      },
    ],
  },
];

export const defaultTemplateCert = [
  {
    template_id: 1,
    certType: "cert",
    templateType: "simple_border",
    pdf: FileTest,
    type: "template",
  },
  {
    template_id: 2,
    certType: "cert",
    templateType: "simple_no_border",
    pdf: FileTestNoBorder,
    type: "template",
  },
  {
    template_id: 3,
    certType: "cert",
    templateType: "simple_border",
    pdf: FileTest,
    type: "template",
  },
];
export const defaultTemplateBlotter = [
  {
    template_id: 11,
    certType: "cert",
    templateType: "simple_border",
    pdf: FileTest,
    type: "template",
  },
  {
    template_id: 22,
    certType: "cert",
    templateType: "simple_border",
    pdf: FileTest,
    type: "template",
  },
  {
    template_id: 12,
    certType: "cert",
    templateType: "simple_border",
    pdf: FileTest,
    type: "template",
  },
  {
    template_id: 42,
    certType: "cert",
    templateType: "simple_border",
    pdf: FileTest,
    type: "template",
  },
];
export const defaultTemplateBusiness = [];
