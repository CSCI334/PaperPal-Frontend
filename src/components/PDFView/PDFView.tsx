import React, { useState } from "react";
import { Box } from "@mui/system";
import {Button, Grid, Container, Typography} from '@mui/material';
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Set workerSrc to load PDF files
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//Ensures file is always of type string
interface PDFViewerProps {
    file: string;
}
//This class deals with the actual rendering of PDFView and anything else it needs to render
const PDFView: React.FC<PDFViewerProps> = ({ file }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);

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

    //PDF render
    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "#f2f2f2",
                    minHeight: "100%",
                    py: 4,
                    flexGrow: 1
            }}>
                <Box flexGrow={1} sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 2 }}>
                    <Document file={{ url: file }}
                              renderMode="canvas"
                              onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page
                            pageNumber={pageNumber}
                            scale={1.7}
                        />
                    </Document>
                </Box>
                {numPages && (
                    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 0 }}>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={prevPage} disabled={pageNumber === 1}>
                                Previous
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography>
                                Page {pageNumber} of {numPages}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={nextPage} disabled={pageNumber === numPages}>
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

export default PDFView;

