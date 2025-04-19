"use client";
import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  padding: 1.2rem;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  justify-content: space-between;
`;

const HeadingText = styled.h1`
  font-family: var(--font-geist-sans), system-ui, sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #3b82f6;
  margin: 0;
  padding: 0.8rem;
`;

const TaglineText = styled.p`
  font-size: 0.95rem;
  color: #64748b;
  margin: 0;
  padding-left: 0.8rem;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <TitleBar>
        <div>
          <HeadingText>CS391 URL Shortener</HeadingText>
          <TaglineText>Transform long links into short URLs</TaglineText>
        </div>
      </TitleBar>
    </HeaderWrapper>
  );
};

export default Header;