"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import createUrl from "@/lib/createUrl";
import { Url } from "@/types";

const FormContainer = styled.div`
  max-width: 680px;
  margin: 1.75rem auto;
  padding: 0.5rem 1.5rem;
  font-family: var(--font-sans, system-ui, sans-serif);
`;

const FormElement = styled.form`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.12);
  }
  
  @media (prefers-color-scheme: dark) {
    background: linear-gradient(to bottom, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.8));
    border: 1px solid rgba(71, 85, 105, 0.3);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const FormTitle = styled.h2`
  font-size: 1.85rem;
  margin-bottom: 1.75rem;
  font-weight: 700;
  text-align: center;
  color: #f1f5f9;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  
  @media (prefers-color-scheme: light) {
    color: #1e293b;
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: none;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #f1f5f9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  
  @media (prefers-color-scheme: light) {
    color: #1e293b;
  }
`;

const TextInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #c0c7d0;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  background-color: #fff;
  color: #333;
  font-weight: 500;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.08);

  &::placeholder {
    color: #94a3b8;
    opacity: 0.8;
  }

  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
  }
`;

const AliasWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DomainPrefix = styled.span`
  color: #e2e8f0;
  font-size: 0.95rem;
  white-space: nowrap;
  padding-right: 0.5rem;
  font-weight: 500;
  
  @media (prefers-color-scheme: light) {
    color: #334155;
  }
`;

const HelpText = styled.p`
  font-size: 0.8rem;
  color: #cbd5e1;
  margin-top: 0.5rem;
  font-style: italic;
  
  @media (prefers-color-scheme: light) {
    color: #64748b;
  }
`;

const ActionButton = styled.button`
  background-color: var(--accent);
  color: white;
  padding: 0.9rem 1.5rem;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
  box-shadow: 0 4px 6px rgba(79, 70, 229, 0.2);

  &:hover {
    background-color: var(--accent-dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(79, 70, 229, 0.25);
  }

  &:disabled {
    background-color: var(--accent-light);
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ErrorBox = styled.div`
  background-color: rgba(254, 226, 226, 0.9);
  color: #b91c1c;
  padding: 1rem;
  border-radius: 12px;
  font-size: 0.95rem;
  margin-top: 1rem;
  text-align: center;
  border: 1px solid rgba(252, 165, 165, 0.8);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15);
  font-weight: 500;
  
  @media (prefers-color-scheme: dark) {
    background-color: rgba(127, 29, 29, 0.5);
    color: #fca5a5;
    border: 1px solid rgba(252, 165, 165, 0.3);
  }
`;

const ResultBox = styled.div`
  background-color: #ecfdf5;
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid #a7f3d0;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  
  @media (prefers-color-scheme: dark) {
    background: linear-gradient(to bottom, rgba(6, 95, 70, 0.4), rgba(6, 78, 59, 0.3));
    border: 1px solid rgba(16, 185, 129, 0.4);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

const ResultHeading = styled.p`
  font-weight: 700;
  color: #059669;
  margin-bottom: 1.25rem;
  font-size: 1.2rem;
  letter-spacing: 0.01em;
  
  @media (prefers-color-scheme: dark) {
    color: #34d399;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
`;

const LinkDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0.85rem 1.2rem;
  border-radius: 10px;
  border: 1px solid #d1fae5;
  
  @media (prefers-color-scheme: dark) {
    background-color: rgba(15, 23, 42, 0.5);
    border: 1px solid rgba(16, 185, 129, 0.4);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.05);
  }
`;

const ShortLink = styled.a`
  color: var(--accent);
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  font-size: 1.05rem;
  
  @media (prefers-color-scheme: dark) {
    color: #93c5fd;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    
    &:hover {
      color: #bfdbfe;
    }
  }

  &:hover {
    text-decoration: underline;
  }
`;

const CopyButton = styled.button`
  background-color: var(--accent);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.15s ease;
  font-weight: 500;

  &:hover {
    background-color: var(--accent-dark);
    transform: translateY(-1px);
  }
`;

export default function Form() {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [origin, setOrigin] = useState("");
  
  // Set the origin only on the client side after component mounts
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setShortenedUrl(null);

    try {
      const result = await createUrl(longUrl, customAlias);
      
      if (typeof result === "string") {
        setError(result);
      } else {
        const urlObj = result as Url;
        setShortenedUrl(urlObj.urlAfter);
      }
    } catch (err) {
      console.error("Error creating shortened URL:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (shortenedUrl && origin) {
      const fullUrl = `${origin}/${shortenedUrl}`;
      navigator.clipboard.writeText(fullUrl);
      alert("URL copied to clipboard!");
    }
  };

  return (
    <FormContainer>
      <FormElement onSubmit={handleSubmit}>
        <FormTitle>Create Your Shortened URL</FormTitle>

        <FormSection>
          <InputLabel htmlFor="longUrl">Original URL</InputLabel>
          <TextInput
            id="longUrl"
            type="url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="https://example.com/verylongpathtopage"
            required
            disabled={isSubmitting}
          />
        </FormSection>
        
        <FormSection>
          <InputLabel htmlFor="customAlias">Custom Alias (Optional)</InputLabel>
          <AliasWrapper>
            <DomainPrefix>{origin}/</DomainPrefix>
            <TextInput
              id="customAlias"
              type="text"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              placeholder="my-custom-alias"
              disabled={isSubmitting}
            />
          </AliasWrapper>
          <HelpText>Leave empty for a randomly generated alias</HelpText>
        </FormSection>

        <ActionButton 
          type="submit" 
          disabled={isSubmitting || !longUrl}
        >
          {isSubmitting ? "Processing..." : "Generate Short URL"}
        </ActionButton>
      </FormElement>

      {error && <ErrorBox>{error}</ErrorBox>}

      {shortenedUrl && (
        <ResultBox>
          <ResultHeading>Your shortened URL is ready!</ResultHeading>
          <LinkDisplay>
            <ShortLink 
              href={`${origin}/${shortenedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`${origin}/${shortenedUrl}`}
            </ShortLink>
            <CopyButton 
              onClick={handleCopyToClipboard}
              type="button"
            >
              Copy URL
            </CopyButton>
          </LinkDisplay>
        </ResultBox>
      )}
    </FormContainer>
  );
}