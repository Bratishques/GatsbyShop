import {Link} from "gatsby"
import React from "react"
import styled from 'styled-components';

const StyledLink = styled(Link)`

            text-decoration: none;
            color: white;


`

export default (props) => <StyledLink {...props} />;