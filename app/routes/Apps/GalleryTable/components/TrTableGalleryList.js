import React from 'react';
import faker from 'faker';

import { 
    Badge,
    CustomInput,
    Avatar,
    HolderProvider,
    CardImg,
    Media,
    AvatarAddOn,
    Button,
    UncontrolledTooltip
} from './../../../../components';

import { randomArray } from './../../../../utilities';

const status = [
    "secondary",
    "danger",
    "success",
    "warning"
];
const badges = [
    "secondary",
    "primary",
    "info"
];

const TrTableGalleryList = () => (
    <React.Fragment>
        <tr>
            <td className="align-middle">
                <CustomInput type="checkbox" id="clientCheckbox" label="" inline />
            </td>
            <td className="align-middle">
                <HolderProvider.Icon
                    iconChar=""
                    size={ 16 }
                    width={ 100 }
                    height={ 100 }
                >
                    <CardImg className="rounded" />
                </HolderProvider.Icon>
            </td>
            <td className="align-middle">
                <span>
                    <a className="text-inverse">
                        { faker.commerce.productName() }
                    </a>
                    <br />
                    <span href="#">
                        { faker.system.fileName() }
                    </span>
                    <br />
                    <Badge pill color={ randomArray(badges) } className="mr-1">
                        { faker.commerce.department() }
                    </Badge>
                    <Badge pill color={ randomArray(badges) } className="mr-1">
                        { faker.commerce.department() }
                    </Badge>
                    <Badge pill color={ randomArray(badges) } className="mr-1">
                        { faker.commerce.department() }
                    </Badge>
                </span>
            </td>
            <td className="align-middle">
                <Media>
                    <Media left className="align-self-center mr-3">
                        <Avatar.Image
                            size="md"
                            src="http://bs4.webkom.co/img/avatars/2.jpg"
                            addOns={[
                                <AvatarAddOn.Icon 
                                    className="fa fa-circle"
                                    color="white"
                                    key="avatar-icon-bg"
                                />,
                                <AvatarAddOn.Icon 
                                    className="fa fa-circle"
                                    color={ randomArray(status) }
                                    key="avatar-icon-fg"
                                />
                            ]}
                        /> 
                    </Media>
                    <Media body>
                        <div className="mt-0 d-flex">
                            { faker.name.firstName() } { faker.name.lastName() }
                        </div>
                        <span>
                            { faker.address.state() }, { faker.address.stateAbbr() } 
                        </span>
                    </Media>
                </Media>
            </td>
            <td className="align-middle">
                22-Jul-2012
            </td>
            <td className="align-middle">
                Size: { faker.random.number() } Kb<br />
                Format: .png
            </td>
            <td className="align-middle text-right">
                <Button color="secondary" outline id="tooltipDownload">
                    <i className="fa fa-download"></i>
                </Button>
                <UncontrolledTooltip placement="top" target="tooltipDownload">
                   Download
                </UncontrolledTooltip>
            </td>
        </tr>
    </React.Fragment>
)

export { TrTableGalleryList };
