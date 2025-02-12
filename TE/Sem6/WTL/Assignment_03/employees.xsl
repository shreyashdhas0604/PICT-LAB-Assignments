<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">
        <html>
            <head>
                <title>Employee Details</title>
            </head>
            <body>
                <h2 align="center">WTL Assignment No 03 - Employee Details</h2>
<p align="center">31423 - Shreyash Dhas</p>

                
                <!-- Table layout with background colors -->
                <table border="1" cellpadding="10" cellspacing="0" width="100%" bgcolor="#f9f9f9">
                    <!-- Header row with background color -->
                    <tr bgcolor="#B0B0B0">
                        <th align="left">ID</th>
                        <th align="left">Name</th>
                        <th align="left">Department</th>
                        <th align="left">Position</th>
                        <th align="left">Salary</th>
                    </tr>
                    <!-- Loop through employees and display each in a row -->
                    <xsl:for-each select="employees/employee">
                        <tr>
                            <td bgcolor="#D3D3D3"><xsl:value-of select="id"/></td>
                            <td bgcolor="#D3D3D3"><xsl:value-of select="name"/></td>
                            <td bgcolor="#D3D3D3"><xsl:value-of select="department"/></td>
                            <td bgcolor="#D3D3D3"><xsl:value-of select="position"/></td>
                            <td bgcolor="#D3D3D3"><xsl:value-of select="salary"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>

</xsl:stylesheet>
