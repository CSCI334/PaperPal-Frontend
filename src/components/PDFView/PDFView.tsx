import React, { useState } from "react";
import { Button, Grid, Container, Typography } from '@mui/material';
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { useAuth } from "../../context/AuthContext";
import { HTTP } from "../../data/HttpConfig";

// Set workerSrc to load PDF files
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//Ensures file is always of type string
interface PDFViewerProps {
    paperId: string;
    author: string;
    coAuthors: string;
}

// This class deals with the actual rendering of PDFView and anything else it needs to render
const PDFView: React.FC<PDFViewerProps> = React.memo(({ paperId , author, coAuthors}) => {
    const [ numPages, setNumPages ] = useState<number | null>(null);
    const [ pageNumber, setPageNumber ] = useState<number>(1);
    const { authState, setAuthState } = useAuth()
    const paperLink = `${HTTP.dev.BASE_URL}/paper/${paperId}`;
    //Function to set the number of pages upon a successful PDF load
    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);

    }
    const nextPage = () => {
        if (pageNumber < (numPages || 0)) setPageNumber(pageNumber + 1);
    };

    const prevPage = () => {
        if (pageNumber > 1) setPageNumber(pageNumber - 1);
    };

    //Renders the pdf
    return (
        <Container sx={{ display: "flex", flexDirection: "column", py: "12px", alignItems: "center", flexShrink: 1, flexGrow: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{ marginRight: '10px' }}>Author: {author}</p>
                <p>Co Authors: {coAuthors === "" ? 'No co-authors' : coAuthors}</p>
            </div>
            <Document file={{
                url: paperLink,
                httpHeaders: authState.headers
            }}
                className={"pdf-viewer"}
                renderMode="canvas"
                onLoadSuccess={onDocumentLoadSuccess}
                onItemClick={(value) => {
                    setPageNumber(Number(value.pageNumber))
                }}
            >
                <Page
                    pageNumber={pageNumber}
                    renderTextLayer={false}
                    scale={1.7}
                />
            </Document>
            {numPages && (
                <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 0 }}>
                    <Grid item>
                        <Button
                            sx={{
                                backgroundColor: "#72BAD1",
                                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.075)",
                                borderRadius: "20px",
                                width: "150px",
                                color: "white"
                            }}
                            onClick={prevPage} disabled={pageNumber === 1}
                        >
                            Previous
                        </Button>
                    </Grid>
                    <Grid item>
                        <Typography>
                            Page {pageNumber} of {numPages}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            sx={{
                                backgroundColor: "#72BAD1",
                                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.075)",
                                borderRadius: "20px",
                                width: "150px",
                                color: "white"
                            }}
                            onClick={nextPage} disabled={pageNumber === numPages}
                        >
                            Next
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
});

export default React.memo(PDFView);

